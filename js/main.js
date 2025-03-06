// 初始化粒子效果
document.addEventListener('DOMContentLoaded', function() {
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#ffffff'
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: 0.5,
                random: false
            },
            size: {
                value: 3,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#ffffff',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 6,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'repulse'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            }
        },
        retina_detect: true
    });
});

// 初始化AOS动画库
AOS.init({
    duration: 1000,
    once: true
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 导航栏滚动效果
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    let nav = document.querySelector('.nav-bar');
    
    if (scrollTop > lastScrollTop) {
        nav.style.transform = 'translateY(-100%)';
    } else {
        nav.style.transform = 'translateY(0)';
    }
    lastScrollTop = scrollTop;
});

// 技能标签云
const skills = [
    'AI', 'Machine Learning', 'Deep Learning', 'Python',
    'Product Management', 'Solution Architecture', 'Data Analysis',
    'Neural Networks', 'NLP', 'Computer Vision'
];

function createSkillCloud() {
    const cloud = document.querySelector('.skills-cloud');
    skills.forEach(skill => {
        const tag = document.createElement('div');
        tag.className = 'skill-tag';
        tag.textContent = skill;
        tag.setAttribute('data-aos', 'fade-up');
        cloud.appendChild(tag);
    });
}



function createProjectCards() {
    const grid = document.querySelector('.project-grid');
    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.setAttribute('data-aos', 'fade-up');
        card.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <div class="project-info">
                <h3>${project.title}</h3>
                <div class="tech-stack">
                    ${project.tech.map(t => `<span>${t}</span>`).join('')}
                </div>
                <p>${project.description}</p>
            </div>
        `;
        grid.appendChild(card);
    });
}

// 轮播图功能
class Carousel {
    constructor(element) {
        this.element = element;
        this.items = element.querySelectorAll('.carousel-item');
        this.currentIndex = 0;
        this.interval = null;
        this.init();
    }

    init() {
        this.showItem(0);
        this.startAutoPlay();
        this.addControls();
    }

    showItem(index) {
        this.items.forEach(item => item.style.display = 'none');
        this.items[index].style.display = 'block';
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.items.length;
        this.showItem(this.currentIndex);
    }

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
        this.showItem(this.currentIndex);
    }

    startAutoPlay() {
        this.interval = setInterval(() => this.next(), 5000);
    }

    stopAutoPlay() {
        clearInterval(this.interval);
    }

    addControls() {
        const prevButton = document.createElement('button');
        const nextButton = document.createElement('button');
        prevButton.innerHTML = '❮';
        nextButton.innerHTML = '❯';
        prevButton.className = 'carousel-control prev';
        nextButton.className = 'carousel-control next';
        
        prevButton.addEventListener('click', () => this.prev());
        nextButton.addEventListener('click', () => this.next());
        
        this.element.appendChild(prevButton);
        this.element.appendChild(nextButton);
    }
}

// 初始化页面功能
document.addEventListener('DOMContentLoaded', function() {
    createSkillCloud();
    createProjectCards();
    
    // 初始化轮播图
    const carousel = new Carousel(document.querySelector('.carousel'));
});

// PDF查看器功能
function openPDF(pdfPath) {
    const modal = document.getElementById('pdfModal');
    const viewer = document.getElementById('pdfViewer');
    const title = document.getElementById('pdfTitle');
    
    // 设置PDF标题
    const pdfName = pdfPath.split('/').pop().replace('.pdf', '');
    title.textContent = pdfName.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
    
    // 设置PDF路径
    viewer.src = pdfPath;
    
    // 显示模态框
    modal.classList.add('active');
    
    // 禁止背景滚动
    document.body.style.overflow = 'hidden';
}

function closePDF() {
    const modal = document.getElementById('pdfModal');
    const viewer = document.getElementById('pdfViewer');
    
    // 清除PDF
    viewer.src = '';
    
    // 隐藏模态框
    modal.classList.remove('active');
    
    // 恢复背景滚动
    document.body.style.overflow = 'auto';
}

// 点击模态框外部关闭
document.getElementById('pdfModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closePDF();
    }
});

// 阻止PDF容器的点击事件冒泡
document.querySelector('.pdf-modal-content').addEventListener('click', function(e) {
    e.stopPropagation();
}); 