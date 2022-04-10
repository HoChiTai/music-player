

const PLAYER_STORAGE_KEY = 'Music Player';
const playTopList = document.querySelector('.list-top-music');
const singleTopList = document.querySelector('.list-top-music li');
const playList = document.querySelector('.list-played');
const audio = document.querySelector('#audio');
const imgSongPlaying = document.querySelector('.box-playing__content .img');
const nameSongPlaying = document.querySelector('.box-playing__content .name-sound');
const singerSongPlaying = document.querySelector('.box-playing__content .singer');
const playBtn = document.querySelector('.bg-playing-icon');
const progress = document.querySelector('#progress');
const btnPrev = document.querySelector('.playing-icon__item.prev');
const btnNext = document.querySelector('.playing-icon__item.next');
const btnRandom = document.querySelector('.playing-icon__item.random');
const btnRepeat = document.querySelector('.playing-icon__item.repeat');
const btnArtistPrev = document.querySelector('.top-artist__btn .prev');
const btnArtistNext = document.querySelector('.top-artist__btn .next');
const timePlayingBegin = document.querySelector('.time-playing .begin');
const timePlayingEnd = document.querySelector('.time-playing .end');


const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    
    setConfig: function(key, value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
    },

    loadConfig: function() {
        this.isRandom = this.config['isRandom'];
        this.isRepeat = this.config['isRepeat'];
        if (this.isRandom) {
            btnRandom.classList.toggle('active', this.isRandom);
        }
        if (this.isRepeat) {
            btnRepeat.classList.toggle('active', this.isRepeat);
        }
    },

    songs : [
        {
            id: 1,
            name: 'Chạy về khóc với anh',
            singer: 'Erik',
            path: './assets/sounds/chay-ve-khoc-voi-anh-erik.mp3',
            time:'3:44',
            image: './assets/img/chay-ve-khoc-voi-anh.jpg',
        },
        {
            id: 2,
            name: 'Em Thích',
            singer: 'SEAN X',
            path: './assets/sounds/em-thich-sean-x.mp3',
            time: '3:00',
            image: './assets/img/em-thich.jpg',
        },
        {
            id: 3,
            name: 'Bao lâu ta lại yêu một người',
            singer: 'Doãn Hiếu',
            path: './assets/sounds/bao-lau-ta-lai-yeu-mot-nguoi-doan-hieu.mp3',
            time: '3:56',
            image: './assets/img/bao-lau-ta-lai-yeu-mot-nguoi.jpg',
        },
        {
            id: 4,
            name: 'Light Switch',
            singer: 'Charlie Puth',
            path: './assets/sounds/light-switch-charlie-puth.mp3',
            time: '3:25',
            image: './assets/img/light-switch.jpg',
        },
        {
            id: 5,
            name: 'Ngày đầu tiên',
            singer: 'Đức Phúc',
            path: './assets/sounds/ngay-dau-tien-duc-phuc.mp3',
            time: '3:34',
            image: './assets/img/ngay-dau-tien.jpg',
        },
        {
            id: 6,
            name: 'Có hẹn với thanh xuân',
            singer: 'MONSTAR',
            path: './assets/sounds/co-hen-voi-thanh-xuan-monstar.mp3',
            time: '4:29',
            image: './assets/img/co-hen-voi-thanh-xuan.jpg',
        },
        {
            id: 7,
            name: 'Ngày xưa em đến',
            singer: 'Anh Khang',
            path: './assets/sounds/ngay-xua-em-den-anh-khang.mp3',
            time: '4:19',
            image: './assets/img/ngay-xua-em-den.jpg',
        },
        {
            id: 8,
            name: 'Reality',
            singer: 'Lost Frequencies',
            path: './assets/sounds/reality-lost-frequencies.mp3',
            time: '2:39',
            image: './assets/img/reality.jpg',
        },
        {
            id: 9,
            name: 'Shape of You',
            singer: 'Ed Sheeran',
            path: './assets/sounds/shape-of-you-ed-sheeran.mp3',
            time: '4:37',
            image: './assets/img/shape-of-you.jpg',
        },
        {
            id: 10,
            name: 'Way Back Home',
            singer: 'SHAUN feat. Conor Maynard',
            path: './assets/sounds/way-back-home-shaun.mp3',
            time: '3:13',
            image: './assets/img/way-back-home.jpg',
        },
    ],

    render: function () {
        const listSong = this.songs.map(function (song, index) {
            return `
                <div class="col-12">
                    <div class="single-played ${ index == 0 ? 'active' : ''}">
                        <div class="single-info">
                            <div class="id-sound">
                                ${index < 9 ? '0'+(index+1) : index+1}
                            </div>
                            <div class="img-sound" style="background-image: url('${song.image}');"></div>
                            <div class="icon-play">
                                <i class="fa-solid fa-play"></i>
                            </div>
                            <div class="name-sound">
                                ${song.name}
                            </div>
                        </div>
                        <div class="singer-sound">${song.singer}</div>
                        <div class="time-played">${song.time}</div>
                        <div class="icon-playing-sound ">
                            <i class="fa-solid fa-chart-simple"></i>
                        </div>
                    </div>
                </div>
                `
        })

        playList.innerHTML = listSong.join('');

        const listTopSong = this.songs.map(function (song, index) {
            return `
                <li>
                    <div class="img" style="background-image: url('${song.image}');"></div>
                    <div class="name-sound">${song.name}</div>
                    <div class="singer">${song.singer}</div>
                </li>
            `
        })

        playTopList.innerHTML = listTopSong.join('');

    },

    scrollToActiveSong: function() {
        setTimeout(function() {
            document.querySelector('.single-played.active').scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
            });
        }, 300);
    },

    getCurrentSong: function() {
        return this.songs[this.currentIndex];
    },

    loadCurrentSong: function() {
        const currentSong = this.getCurrentSong();       
        audio.src = currentSong.path;
        imgSongPlaying.style = `background-image: url(${currentSong.image});`;
        nameSongPlaying.textContent = currentSong.name;
        singerSongPlaying.textContent = currentSong.singer;
        timePlayingEnd.textContent = currentSong.time;
        document.querySelector('.single-played.active').classList.remove('active');
        document.querySelectorAll('.single-played')[this.currentIndex].classList.add('active');
    },

    handleEvents: function() {
        
        const _this = this;
        const singleSongs = document.querySelectorAll('.single-played');


        // Animation song playing
        const imgSongPlayingAnimate = imgSongPlaying.animate([
            { transform: 'rotate(360deg)'}
        ], {
            duration: 10000,
            iterations: Infinity
        })
        imgSongPlayingAnimate.pause();

        // Handle when click play 
        playBtn.onclick = function() {
            if (_this.isPlaying) {
                audio.pause();
            }
            else {
                audio.play();
            }     
        }

        // When song play
        audio.onplay = function() {
            _this.isPlaying = true;
            playBtn.classList.add('playing');
            imgSongPlayingAnimate.play();
        }

        // When song pause
        audio.onpause = function() {
            _this.isPlaying = false;
            playBtn.classList.remove('playing');
            imgSongPlayingAnimate.pause();
        }

        // When  progress song updated
        audio.ontimeupdate = function() {
            if (audio.duration) {
                // const progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
                // progress.value = progressPercent;
                const maxDuration = Math.ceil(audio.duration);
                progress.max = maxDuration;

                const currentSeconds = Math.floor(audio.currentTime);
                progress.value = currentSeconds;

                const totalMinutes = Math.floor(maxDuration/60);
                let totalSeconds = maxDuration - totalMinutes * 60;

                const currentMinutes = Math.floor(currentSeconds/60);

                const remainSeconds = currentSeconds - currentMinutes * 60;

                const textBegin = currentMinutes + ':' + (remainSeconds <= 9 ?  '0'+ remainSeconds : remainSeconds);

                
                let borrowMinutes = 0;
                
                if (currentSeconds > totalSeconds) {
                    borrowMinutes = 1;
                    borrowMinutes += Math.floor((currentSeconds-totalSeconds)/60);
                    if (currentSeconds == (totalSeconds + (borrowMinutes - 1) * 60)) {
                        borrowMinutes -= 1;
                    }
                }

                // let mathRemainMinutes = totalMinutes - currentMinutes;

                let mathRemainMinutes = totalMinutes - borrowMinutes;

                let mathRemainSeconds = totalSeconds + borrowMinutes * 60 - currentSeconds;

                console.log('currentSeconds:' + currentSeconds);
                console.log('borrowMinutes:' + borrowMinutes);
                console.log('mathRemainMinutes:' + mathRemainMinutes);
                console.log('mathRemainSeconds:' + mathRemainSeconds);

                // console.log(currentMinutes);

                // console.log(mathRemainSeconds);

                // if (mathRemainSeconds < 0) {
                //     totalSeconds = 59;
                //     mathRemainSeconds = 59;
                //     console.log(123)
                //     borrowMinutes++;
                // }

                

                const textEnd = mathRemainMinutes + ':' + (mathRemainSeconds <= 9 ?  '0' + mathRemainSeconds : mathRemainSeconds)

                timePlayingBegin.textContent = textBegin;
                timePlayingEnd.textContent = textEnd;

                // console.log(totalSeconds);
                // console.log(remainSeconds);
                // console.log(mathRemainMinutes);
                // console.log(mathRemainSeconds);
            }

        }

        // When song pass
        progress.onchange = function(e) {
            const seekTime = e.target.value;
            audio.currentTime =  seekTime;
        }

        // When click next song
        btnNext.onclick = function() {
            if (_this.isRandom) {
                _this.playRandomSong();

            } else {
                _this.nextSong();
            } 
            audio.play();
            _this.scrollToActiveSong();
        }

        // When click prev song
        btnPrev.onclick = function() {
            if (_this.sRandom) {
                _this.playRandomSong();
            } else {
                _this.prevSong();
            } 
            audio.play();
            _this.scrollToActiveSong();
        }

        // When click random songs
        btnRandom.onclick = function() {
            _this.isRandom = !_this.isRandom;
            _this.setConfig('isRandom', _this.isRandom);
            btnRandom.classList.toggle('active', _this.isRandom);
        }

        // When click random songs
        btnRepeat.onclick = function() {
            _this.isRepeat = !_this.isRepeat;
            _this.setConfig('isRepeat', _this.isRepeat);
            btnRepeat.classList.toggle('active', _this.isRepeat);
        }

        btnArtistNext.onclick = function() {
            // console.log(playTopList.offsetWidth);
            // console.log(singleTopList);
            playTopList.scrollLeft += 500;
            playTopList.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
            })
        }

        btnArtistPrev.onclick = function() {
            playTopList.scrollLeft -= 500;
        }


        // Handle next song when audio ended
        audio.onended = function() {
            if (_this.isRepeat) {
                audio.play();
            } else {
                btnNext.click();
            }
        }

        // When change song in list songs
        
        singleSongs.forEach(function (song, index) {
            song.onclick = function() {
                if (!this.classList.contains('active')) {
                    document.querySelector('.single-played.active').classList.remove('active');
                    this.classList.add('active');
                    _this.currentIndex=index;
                    _this.loadCurrentSong();
                    audio.play();
                }
            }
        })



    },

    nextSong: function() {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },

    prevSong: function() {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },

    playRandomSong: function() {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length);
        } 
        while (this.currentIndex === newIndex);
        this.currentIndex = newIndex;
        this.loadCurrentSong();
    },

    start: function() {
        // Render songs
        this.render();
        // Load the first song when UI loaded
        this.loadCurrentSong();
        // Handle events
        this.handleEvents();
        // Load settings
        this.loadConfig();
       
    }
};

app.start();