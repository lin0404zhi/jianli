// 热门岗位数据
const trendingJobs = [
    {
        id: 1,
        title: "资深AI产品经理",
        rank: 1
    },
    {
        id: 2,
        title: "高级产品经理-大模型方向",
        rank: 2
    },
    {
        id: 3,
        title: "产品经理-AIGC方向",
        rank: 3
    },
    {
        id: 4,
        title: "ToB产品经理-AI解决方案",
        rank: 4
    },
    {
        id: 5,
        title: "AI应用产品经理",
        rank: 5
    }
];

// 更新时间显示
const updateLastUpdateTime = () => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日 ${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
    document.getElementById('lastUpdate').textContent = formattedDate;
};

// 渲染职位列表
const renderJobList = () => {
    const jobList = document.getElementById('jobList');
    jobList.innerHTML = '';

    trendingJobs.forEach(job => {
        const jobElement = document.createElement('div');
        jobElement.className = 'job-item';
        jobElement.innerHTML = `
            <div class="job-title">
                <span class="rank">#${job.rank}</span> ${job.title}
            </div>
        `;

        jobElement.addEventListener('click', () => {
            document.querySelectorAll('.job-item').forEach(item => {
                item.classList.remove('active');
            });
            jobElement.classList.add('active');
            showAnalysisButton(job);
        });

        jobList.appendChild(jobElement);
    });
};

// 添加显示分析按钮的函数
const showAnalysisButton = (job) => {
    const analysisContent = document.getElementById('analysisContent');
    analysisContent.innerHTML = `
        <div class="analysis-prompt">
            <img src="../rebang/icon/dongtu2.gif" alt="AI分析" class="analysis-icon">
            <h3>${job.title}</h3>
            <button class="start-analysis-btn" onclick="startAnalysis('${job.id}')">
                <i class="fas fa-robot"></i> 点击deepseek分析
            </button>
        </div>
    `;
};

// 添加开始分析的函数
const startAnalysis = (jobId) => {
    const job = trendingJobs.find(j => j.id === parseInt(jobId));
    if (job) {
        analyzeJob(job);
    }
};

// 调用 Deepseek API 进行岗位分析
const analyzeJob = async (job) => {
    const analysisContent = document.getElementById('analysisContent');
    
    analysisContent.innerHTML = `
        <div class="loading-content">
            <img src="../rebang/icon/dongtu2.gif" alt="加载中" class="analysis-icon">
            <p>AI 正在分析职位要求...</p>
        </div>
    `;

    try {
        const response = await fetch('https://api.deepseek.com/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer sk-b58052d7290d477ea53a04f07b346e21'
            },
            body: JSON.stringify({
                model: "deepseek-chat",
                messages: [{
                    role: "user",
                    content: `作为AI分析师，请详细分析这个岗位的要求：${job.title} - ${job.company}
                    请从以下维度进行分析：
                    1. 核心能力要求：需要具备哪些关键能力
                    2. 技术要求：需要掌握的技术栈和工具
                    3. 专业技能：需要具备的专业知识和技能
                    4. 从业经验：需要的工作经验和项目经验
                    
                    输出要求：
                    - 每个维度分别列出3-5点具体要求
                    - 每点描述要简洁明了
                    - 突出该岗位的特殊要求`
                }],
                temperature: 0.7
            })
        });

        const data = await response.json();
        const analysis = data.choices[0].message.content;

        // 解析并格式化分析结果
        const sections = analysis.split(/(?=\d\.\s+)/);
        const formattedSections = sections.map(section => {
            if (!section.trim()) return '';
            const [title, ...points] = section.split('\n');
            return `
                <div class="analysis-section">
                    <h3>${title.replace(/^\d\.\s+/, '')}</h3>
                    <ul>
                        ${points.map(point => 
                            point.trim() ? `<li>${point.trim().replace(/^[•\-\*]\s*/, '')}</li>` : ''
                        ).join('')}
                    </ul>
                </div>
            `;
        }).join('');

        analysisContent.innerHTML = `
            <div class="analysis-content">
                ${formattedSections}
            </div>
        `;
    } catch (error) {
        console.error('分析失败:', error);
        analysisContent.innerHTML = `
            <div class="placeholder-content">
                <img src="../rebang/icon/dongtu2.gif" alt="AI分析" class="analysis-icon">
                <p>分析失败，请稍后重试</p>
            </div>
        `;
    }
};

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    updateLastUpdateTime();
    renderJobList();
});

// 获取选中的选项数据
const getSelectedOptions = () => {
    const selected = {
        industry: [],
        position: [],
        travel: [],
        age: []
    };
    
    document.querySelectorAll('.option-group').forEach(group => {
        const label = group.querySelector('.option-label').textContent;
        const checkedBoxes = group.querySelectorAll('input[type="checkbox"]:checked');
        
        checkedBoxes.forEach(box => {
            if (label.includes('行业经验')) {
                selected.industry.push(box.nextElementSibling.textContent);
            } else if (label.includes('职位经验')) {
                selected.position.push(box.nextElementSibling.textContent);
            } else if (label.includes('接受出差')) {
                selected.travel.push(box.nextElementSibling.textContent);
            } else if (label.includes('35岁')) {
                selected.age.push(box.nextElementSibling.textContent);
            }
        });
    });
    
    return selected;
};

// 开始AI分析
const startCareerAnalysis = async () => {
    const outputContent = document.querySelector('.analysis-output-content');
    const selected = getSelectedOptions();
    
    // 显示加载状态
    outputContent.innerHTML = `
        <div class="loading-content">
            <img src="../rebang/icon/dongtu2.gif" alt="分析中" class="analysis-icon">
            <p>AI正在分析您的选择...</p>
        </div>
    `;
    
    try {
        const response = await fetch('https://api.deepseek.com/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer sk-b58052d7290d477ea53a04f07b346e21'
            },
            body: JSON.stringify({
                model: "deepseek-chat",
                messages: [{
                    role: "user",
                    content: `作为AI职业分析师，请根据以下信息进行岗位匹配分析：
                    
                    求职者偏好：
                    1. 期望行业：${selected.industry.join('、')}
                    2. 职位经验：${selected.position.join('、')}
                    3. 出差要求：${selected.travel.join('、')}
                    4. 年龄要求：${selected.age.join('、')}
                    
                    请从以下维度进行分析：
                    1. 岗位匹配度分析
                    2. 优势与不足分析
                    3. 职业发展建议
                    4. 具体行动建议
                    
                    要求：
                    - 每个维度给出详细分析
                    - 重点突出可行性建议
                    - 语气积极专业`
                }],
                temperature: 0.7
            })
        });

        const data = await response.json();
        const analysis = data.choices[0].message.content;

        // 格式化并显示分析结果
        outputContent.innerHTML = analysis.split('\n').map(line => {
            if (line.match(/^\d\./)) {
                return `<h4 class="analysis-subtitle">${line}</h4>`;
            }
            return `<p>${line}</p>`;
        }).join('');

    } catch (error) {
        console.error('分析失败:', error);
        outputContent.innerHTML = `
            <div class="error-content">
                <p>分析失败，请稍后重试</p>
            </div>
        `;
    }
};

// 绑定按钮点击事件
document.addEventListener('DOMContentLoaded', () => {
    const analysisBtn = document.querySelector('.start-analysis-btn');
    if (analysisBtn) {
        analysisBtn.addEventListener('click', startCareerAnalysis);
    }
});