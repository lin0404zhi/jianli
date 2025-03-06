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
function addMessage(content, isUser) {
    const messagesContainer = document.getElementById('chatMessages');
    const message = createMessageElement(content, isUser);
    messagesContainer.appendChild(message);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    messageHistory.push({ content, isUser });
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

// 处理AI响应
async function handleAIResponse(userMessage) {
    // 这里应该是调用后端API的逻辑
    // 现在用模拟响应代替
    const typing = showTypingIndicator();
    
    try {
        // 模拟API调用延迟
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // 这里替换为实际的API调用
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: userMessage })
        });
        
        if (!response.ok) {
            throw new Error('API请求失败');
        }
        
        const data = await response.json();
        removeTypingIndicator(typing);
        addMessage(data.response, false);
        
    } catch (error) {
        console.error('Error:', error);
        removeTypingIndicator(typing);
        addMessage('抱歉，我现在无法回答。请稍后再试。', false);
    }
}

// 发送消息
async function sendMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value.trim();
    
    if (message) {
        input.value = '';
        addMessage(message, true);
        await handleAIResponse(message);
    }
}

// 键盘事件处理
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

// 初始化欢迎消息
document.addEventListener('DOMContentLoaded', function() {
    addMessage('你好！我是AI助手，很高兴为您服务。请问有什么我可以帮您的吗？', false);
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