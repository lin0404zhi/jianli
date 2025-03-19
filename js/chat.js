// 聊天界面状态管理
let isChatOpen = false;

// 切换聊天界面
function toggleChat() {
    const chatContainer = document.getElementById('chatContainer');
    isChatOpen = !isChatOpen;
    chatContainer.classList.toggle('active', isChatOpen);
}

// 消息历史
let messageHistory = [];

// 创建消息元素
function createMessageElement(content, isUser) {
    const message = document.createElement('div');
    message.className = `message ${isUser ? 'user' : 'ai'}`;
    message.textContent = content;
    return message;
}

// 添加消息到聊天界面
function addMessage(message, isUser = false) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = isUser ? 'user-message' : 'ai-message';
    
    if (isUser) {
        messageDiv.textContent = message;
    } else {
        // 使用 marked 库来渲染 markdown
        if (typeof marked !== 'undefined') {
            messageDiv.innerHTML = marked.parse(message);
            // 如果有代码高亮库，为代码块添加语法高亮
            if (typeof hljs !== 'undefined') {
                messageDiv.querySelectorAll('pre code').forEach((block) => {
                    hljs.highlightBlock(block);
                });
            }
        } else {
            // 如果 marked 库未加载，则使用普通文本
            messageDiv.textContent = message;
            console.warn('Marked library not loaded, displaying plain text');
        }
    }
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// 显示输入中状态
function showTypingIndicator() {
    const messagesContainer = document.getElementById('chatMessages');
    const typing = document.createElement('div');
    typing.className = 'typing';
    typing.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    messagesContainer.appendChild(typing);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    return typing;
}

// 移除输入中状态
function removeTypingIndicator(element) {
    if (element && element.parentNode) {
        element.parentNode.removeChild(element);
    }
}

// API配置
const API_CONFIG = {
    'deepseek-chat': {
        endpoint: 'https://api.deepseek.com/chat/completions',
        apiKey: 'sk-b58052d7290d477ea53a04f07b346e21'
    },
    'Qwen2.5-32B-Instruct': {
        endpoint: 'http://192.168.1.25:8080/v1/chat/completions',
        apiKey: 'EMPTY'
    }
};

let conversationHistory = [
    {
        role: "system",
        content: "你是一个专业的AI助手，可以帮助用户解答各种问题。"
    }
];

// 加载知识库
let knowledgeBase = null;

async function loadKnowledgeBase() {
    try {
        const response = await fetch('../pdf/knowledge.json');
        const data = await response.json();
        knowledgeBase = data;
        console.log('知识库加载成功:', knowledgeBase);
    } catch (error) {
        console.error('加载知识库失败:', error);
    }
}

// 初始化时加载知识库
document.addEventListener('DOMContentLoaded', function() {
    loadKnowledgeBase();
    appendMessage('assistant', '人资小姐姐，你好!！AI-Chat助手，我已接入本地linzhi个人知识库，输入"产品"试试吧！');
});

// 修改后的sendMessage函数
async function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const userMessage = messageInput.value.trim();
    
    if (!userMessage) return;

    // 显示用户消息
    appendMessage('user', userMessage);
    messageInput.value = '';

    // 检查知识库是否已加载
    if (!knowledgeBase) {
        await loadKnowledgeBase();
    }

    // 知识库匹配函数
    const findInKnowledgeBase = (query) => {
        if (!knowledgeBase || !knowledgeBase.questions || !Array.isArray(knowledgeBase.questions)) {
            console.warn('知识库格式不正确或未加载');
            return null;
        }
        
        // 精确匹配
        let matchedQuestion = knowledgeBase.questions.find(item => 
            item.question.toLowerCase() === query.toLowerCase()
        );
        
        if (!matchedQuestion) {
            // 模糊匹配：检查用户问题是否包含知识库问题的关键词
            matchedQuestion = knowledgeBase.questions.find(item => {
                if (item.tags && Array.isArray(item.tags)) {
                    // 使用标签进行匹配
                    return item.tags.some(tag => 
                        query.toLowerCase().includes(tag.toLowerCase())
                    );
                }
                // 如果没有标签，则检查问题本身
                return query.toLowerCase().includes(item.question.toLowerCase()) ||
                       item.question.toLowerCase().includes(query.toLowerCase());
            });
        }
        
        return matchedQuestion;
    };

    // 尝试从知识库中查找答案
    const matchedEntry = findInKnowledgeBase(userMessage);
    
    if (matchedEntry) {
        // 添加来源标记
        const answer = matchedEntry.answer + "\n\n(来自linzhi的知识库)";
        appendMessage('assistant', answer);
        return;
    }

    // 如果没有匹配到知识库内容，继续使用AI服务
    const chatMessages = document.getElementById('chatMessages');
    const modelSelect = document.getElementById('modelSelect');
    const selectedModel = modelSelect.value;

    // 显示加载状态
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'message assistant-message';
    loadingDiv.innerHTML = '<div class="loading">正在思考...</div>';
    chatMessages.appendChild(loadingDiv);

    // 添加用户消息到历史记录
    conversationHistory.push({
        role: "user",
        content: userMessage
    });

    try {
        const apiConfig = API_CONFIG[selectedModel];
        const response = await fetch(apiConfig.endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiConfig.apiKey}`
            },
            body: JSON.stringify({
                model: selectedModel,
                messages: conversationHistory,
                temperature: 0.7,
                top_p: 0.8,
                max_tokens: 512,
                ...(selectedModel === 'Qwen2.5-32B-Instruct' && {
                    extra_body: {
                        repetition_penalty: 1.05
                    }
                })
            })
        });

        const data = await response.json();
        
        // 移除加载状态
        chatMessages.removeChild(loadingDiv);

        if (data.choices && data.choices[0]) {
            const assistantMessage = data.choices[0].message.content;
            appendMessage('assistant', assistantMessage);
            
            // 添加助手回复到历史记录
            conversationHistory.push({
                role: "assistant",
                content: assistantMessage
            });
        } else {
            throw new Error('无效的API响应');
        }
    } catch (error) {
        console.error('API调用错误:', error);
        chatMessages.removeChild(loadingDiv);
        appendMessage('assistant', '抱歉，发生了一些错误，请稍后再试。');
    }
}

function appendMessage(role, content) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}-message`;
    
    // 创建消息头部（头像、名称、时间）
    const messageHeader = document.createElement('div');
    messageHeader.className = 'message-header';
    
    // 添加头像
    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'message-avatar';
    if (role === 'user') {
        avatarDiv.innerHTML = '<img src="pdf/证件照.jpg" alt="林智">';
    } else {
        avatarDiv.innerHTML = '<i class="fas fa-robot"></i>';
    }
    
    // 添加名称和时间信息
    const messageInfo = document.createElement('div');
    messageInfo.className = 'message-info';
    
    const nameDiv = document.createElement('div');
    nameDiv.className = 'message-name';
    nameDiv.textContent = role === 'user' ? '林智' : 'AI对话助手';
    
    const timeDiv = document.createElement('div');
    timeDiv.className = 'message-time';
    const now = new Date();
    timeDiv.textContent = now.toLocaleTimeString('zh-CN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
    
    messageInfo.appendChild(nameDiv);
    messageInfo.appendChild(timeDiv);
    
    // 组装消息头部
    messageHeader.appendChild(avatarDiv);
    messageHeader.appendChild(messageInfo);
    
    // 添加消息内容
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    // 使用marked解析markdown内容
    if (role === 'assistant' && typeof marked !== 'undefined') {
        contentDiv.innerHTML = marked.parse(content);
        // 应用代码高亮
        if (typeof hljs !== 'undefined') {
            contentDiv.querySelectorAll('pre code').forEach((block) => {
                hljs.highlightBlock(block);
            });
        }
    } else {
        contentDiv.textContent = content;
    }
    
    // 组装完整消息
    messageDiv.appendChild(messageHeader);
    messageDiv.appendChild(contentDiv);
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// 添加回车发送功能
document.getElementById('messageInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

// 自动调整输入框高度
document.getElementById('messageInput').addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
});

// 移动端适配：点击外部关闭聊天窗口
document.addEventListener('click', function(e) {
    const chatWidget = document.querySelector('.chat-widget');
    const chatToggle = document.querySelector('.chat-toggle');
    
    if (isChatOpen && 
        !chatWidget.contains(e.target) && 
        e.target !== chatToggle) {
        toggleChat();
    }
});