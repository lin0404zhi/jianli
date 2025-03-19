
// 存储视频列表
let videoList = [
    {
        title: "荷花的十大雅称",
        path: "douyin/video1.mp4",
        text: `<p>荷花的十大雅称，你知道几个？花朵含苞待放叫菡萏，已经盛开为芙蕖，若是红色，则称红蕖，染了禅意，叫莲花，长于水中叫水芝，又叫水芙蓉，因气质出沉清雅，古人称其水宫仙子。有风吹来，花叶袅娜，叫风荷，而默默撑起一切的是藕，故名藕花，荷花凭其高洁风骨，位列十二花客中的静客，荷花，又是农历六月花神，荷叶甜田，愿你好运连连</p>`,
        tags: ["生活感悟", "心灵成长"],
        duration: "3:45",
        active: false
    },
    {
        title: "古人对万物的雅称",
        path: "douyin/video7.mp4",
        text: `<p>古人对万物的雅称，你知道几个？山不叫山，叫翠微；雨不叫雨，叫灵泽；茶不叫茶，叫不夜侯；酒不说酒，说忘忧物；风是扶摇，海是沧渊，云叫仙凝，雾叫流岚；天空叫碧落，大地叫坤灵；太阳叫扶光，月亮叫望舒，茄子叫落苏，小草叫柔甲，风筝叫纸鸢，春天是莺时</p>`,
        tags: ["人生感悟", "心灵启示"],
        duration: "4:50",
        active: false
    },
    {
        title: "半山深处有人家",
        path: "douyin/video2.mp4",
        text: `<p>半山深处有人家，依山傍水远繁华，无为不做俗尘事，轻煮岁月慢煮茶 </p>`,
        tags: ["慢生活", "心情随笔"],
        duration: "4:20",
        active: false
    },
    {
        title: "生活可以忙，但是不能茫",
        path: "douyin/video13.mp4",
        text: `<p> 生活可以忙，但是不能茫，太阳出来去工作，太阳下山去生活，不迷茫，不彷徨，接受自己的普通，也相信自己的与众不同，在平常的日子里，学会用自己的方式取悦自己，忙而不茫，心有所期，闲而有趣，不负时光</p>`,
        tags: ["人生感悟", "心灵启示"],
        duration: "4:50",
        active: false
    },
    {
        title: "人生八好，愿你全都拥有",
        path: "douyin/video1.mp4",
        text: `<p>人生八好，愿你全都拥有，好身体、好心情、好言语、好情绪、好习惯、好心态、好运气，好关系</p>`,
        tags: ["人生感悟", "心灵启示"],
        duration: "4:50",
        active: false
    },
    {
        title: "闲时养心",
        path: "douyin/video2.mp4",
        text: `<p>人的使命就是把生命照看好，把灵魂安顿好，能做的就是把当下的日子过得活色生香，顺时守心，难时宽心，闲时养心，只有不断向内走，安顿好心，安顿好自己，才能从容行走于世间坎坷</p>`,
        tags: ["生命感悟", "自然之美"],
        duration: "5:15",
        active: false
    },
    {
        title: "人间的饭",
        path: "douyin/video7.mp4",
        text: `<p>人间的饭，吃一碗少一碗，身边的人，见一面少一面，脚下的路，走一天少一天。其实人生就是一个减法，来日并不放长，时光匆匆，我们终将释怀。健康的活着，平静的过着，开心的笑着，适当的忙着，就很好</p>`,
        tags: ["人生感悟", "心灵启示"],
        duration: "4:50",
        active: false
    },
    {
        title: "每天给自己一个微笑",
        path: "douyin/video13.mp4",
        text: `<p>每天给自己一个微笑，笑里有幸福，原谅生活中的不完美，宽容生活中的不容易，删除昨天的烦恼，开启今天的快乐</p>`,
        tags: ["人生感悟", "心灵启示"],
        duration: "4:50",
        active: false
    },
    {
        title: "夏已尽，秋将至，一叶落，天下秋",
        path: "douyin/video1.mp4",
        text: `<p>夏已尽，秋将至，一叶落，天下秋。一个转身，夏天就成了故事，一次回眸，秋天变成了风景。四季轮回，愿一切美好都不期而遇</p>`,
        tags: ["人生感悟", "心灵启示"],
        duration: "4:50",
        active: false
    },

    {
        title: "短短28个字，却道尽天下父母心",
        path: "douyin/video2.mp4",
        text: `<p>苏轼写给儿子的这首诗，短短28个字，却道尽天下父母心，值得每个人都读一读。人皆养子望聪明，我被聪明误一生。惟愿孩儿愚且鲁，无灾无难道公卿</p>`,
        tags: ["人生感悟", "心灵启示"],
        duration: "4:50",
        active: false
    },
    {
        title: "世上有两种东西不可直视",
        path: "douyin/video7.mp4",
        text: `<p>世上有两种东西不可直视，一是太阳，二是人心。太阳难以直视，因为其过于耀眼，人心难以看透，因为人善于伪装。与人相守，最终依靠的是品性的最低处，随和是素质，低调是修养，良心是底线。相遇靠缘分，相处靠真心，相守靠真诚。人与人之间，开始让人舒服的一定是言语，后来让人舒服的一定是人品。毕竟，人生不全是利益和竞争，更多的是相互成就，彼此温暖</p>`,
        tags: ["人生感悟", "心灵启示"],
        duration: "4:50",
        active: false
    },

    {
        title: "活得尽兴，潇洒从容",
        path: "douyin/video13.mp4",
        text: `<p>照顾好自己，世界才会属于你，风雨由天，快乐由己，保重身体，健康第一，余生，愿你在力所能及的范围里，活得尽兴，潇洒从容</p>`,
        tags: ["人生感悟", "心灵启示"],
        duration: "4:50",
        active: false
    },
    {
        title: "希望新的一年苦尽甘来",
        path: "douyin/video1.mp4",
        text: `<p>这一年的一言难尽很快就要过去了，希望新的一年苦尽甘来，一切顺利，想开看开，不为难自己，余生很短，请努力活成自己喜欢的模样，做一个幸福的人，不辜负自己，不辜负生活，加油</p>`,
        tags: ["人生感悟", "心灵启示"],
        duration: "4:50",
        active: false
    },

    {
        title: "当你看过世界，见过众生",
        path: "douyin/video2.mp4",
        text: `<p>当你看过世界，见过众生，才发现你要见的世面是自己内心的勇敢和自信，当你看过四季，见过风云，才发现你要见的美景，是自己内心的淡定与从容，望远处的是风景，看近处的才是人生，人生下半场，从容于心，淡定与行， 处变不惊 </p>`,
        tags: ["人生感悟", "心灵启示"],
        duration: "4:50",
        active: false
    },

];

// 默认视频目录
const VIDEO_DIR = 'douyin/';

// DOM 元素
const mainPlayer = document.getElementById('mainPlayer');
const videoListContainer = document.getElementById('videoListContainer');

// 初始化加载本地视频
function loadLocalVideos() {
    // 预设的视频列表
    const defaultVideos = [
        { filename: 'video1.mp4', title: '荷花十大雅称,你知道几个？' },
        // 添加更多视频...
    ];

    defaultVideos.forEach((video, index) => {
        videoList.push({
            title: video.title,
            path: VIDEO_DIR + video.filename,
            duration: '获取中...',
            active: index === 0
        });
    });

    // 渲染列表
    renderVideoList();

    // 如果有视频，播放第一个
    if (videoList.length > 0) {
        playVideo(0);
    }

    // 获取视频时长
    videoList.forEach((video, index) => {
        const tempVideo = document.createElement('video');
        tempVideo.src = video.path;
        tempVideo.onloadedmetadata = () => {
            video.duration = formatDuration(tempVideo.duration);
            renderVideoList();
        };
    });
}

// 生成视频列表
function renderVideoList() {
    videoListContainer.innerHTML = videoList.map((video, index) => `
        <div class="video-item ${video.active ? 'active' : ''}" onclick="playVideo(${index})">
            <div class="video-thumbnail"></div>
            <div class="video-info">
                <div class="video-title">${video.title}</div>
                <div class="video-duration">${video.duration}</div>
            </div>
        </div>
    `).join('');
}

// 播放选中的视频
function playVideo(index) {
    const video = videoList[index];
    
    // 更新视频源
    mainPlayer.src = video.path;
    mainPlayer.play().catch(error => {
        console.error('视频播放失败:', error);
        //alert('视频播放失败，请检查文件路径是否正确');
    });
    
    // 更新活动状态
    videoList.forEach((v, i) => {
        v.active = i === index;
    });
    
    // 重新渲染列表
    renderVideoList();

    // 更新视频文本
    updateVideoText(video);
}

// 格式化视频时长
function formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// 键盘快捷键支持
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        mainPlayer.paused ? mainPlayer.play() : mainPlayer.pause();
    }
});

// 更新视频文本说明
function updateVideoText(video) {
    const titleElement = document.querySelector('.text-title');
    const timeElement = document.querySelector('.text-time');
    const paragraphElement = document.querySelector('.text-paragraph');
    const tagsElement = document.querySelector('.text-tags');

    // 使用淡入效果更新内容
    const textPanel = document.querySelector('.video-text-panel');
    textPanel.style.opacity = '0';
    
    setTimeout(() => {
        // 更新标题
        titleElement.textContent = video.title;
        
        // 更新时间
        timeElement.textContent = video.date;
        
        // 更新文本内容
        paragraphElement.innerHTML = video.text;
        
        // 更新标签
        tagsElement.innerHTML = video.tags
            .map(tag => `<span class="tag">#${tag}</span>`)
            .join('');
            
        // 淡入显示
        textPanel.style.opacity = '1';
    }, 300);
}

// 初始化
loadLocalVideos(); 

