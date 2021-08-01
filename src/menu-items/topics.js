// assets
import { IconPlaylist, IconSocial, IconArchive, IconBulb } from '@tabler/icons';

//import axios
// import axios from 'axios';

//import useState
// import React, { useState } from 'react';

// constant
const icons = {
    IconPlaylist: IconPlaylist,
    IconSocial: IconSocial,
    IconArchive: IconArchive,
    IconBulb: IconBulb
};

// const ChildrenList = () => {
//     const [songList, setSongList] = useState([]);

//     const getSongList = async () => {
//         const res = await axios.get('https://chriskhoo.net/ZS/0/MusicalWork');

//         var data = res.data;
//         var loopData = [];
//         for (var i = 0; i < data.length; i++) {
//             loopData.push(data[i]._fields[2].properties);
//         }

//         setSongList(loopData);
//     };

//     if (songList) {
//         for (const song in songList) {
//             topics.children[0].children.push({
//                 id: song.id,
//                 title: song.label,
//                 type: 'item',
//                 url: `/node/${song.id}`,
//                 target: false
//             });
//         }
//     }

//     return <div></div>;
// };

//-----------------------|| EXTRA PAGES MENU ITEMS ||-----------------------//

export const topics = {
    id: 'topics',
    title: 'topics',
    // caption: 'Pages Caption',
    type: 'group',
    children: [
        {
            id: 'songs',
            title: 'Songs',
            type: 'collapse',
            icon: icons['IconPlaylist'],
            children: [
                {
                    id: 'adilfitri',
                    title: 'Adilfitri',
                    type: 'item',
                    url: '/node/ZS.score.1950.00.00b-Work',
                    target: false
                },
                {
                    id: 'majulahsingapura',
                    title: 'Majulah Singapura',
                    type: 'item',
                    url: '/node/Majulah_Singapura-Work',
                    target: false
                },
                {
                    id: 'nasibmalang',
                    title: 'Nasib Malang',
                    type: 'item',
                    url: '/node/Nasib_Malang-Work',
                    target: false
                },
                {
                    id: 'orangsingapura',
                    title: 'Orang Singapura',
                    type: 'item',
                    url: '/node/Orang_Singapura-Work',
                    target: false
                },
                {
                    id: 'sayangdisayang',
                    title: 'Sayang Disayang',
                    type: 'item',
                    url: '/node/Sayang_Disayang-Work',
                    target: false
                },
                {
                    id: 'semogabahagia',
                    title: 'Semoga Bahagia',
                    type: 'item',
                    url: '/node/Semoga_Bahagia-Work',
                    target: false
                }
            ]
        },
        {
            id: 'social-network',
            title: 'Social Network',
            type: 'item',
            url: '/node/Person',
            icon: icons['IconSocial'],
            breadcrumbs: false
        },
        {
            id: 'genres',
            title: 'Genres',
            type: 'collapse',
            icon: icons['IconArchive'],
            children: [
                {
                    id: 'photos',
                    title: 'Photos',
                    type: 'item',
                    url: '/node/Photograph',
                    target: false
                },
                {
                    id: 'letters',
                    title: 'Letters',
                    type: 'item',
                    url: '/node/Letter',
                    target: false
                },
                {
                    id: 'speeches',
                    title: 'Speeches',
                    type: 'item',
                    url: '/node/Speech',
                    target: false
                },
                {
                    id: 'documents',
                    title: 'Documents',
                    type: 'item',
                    url: '/node/Document',
                    target: false
                },
                {
                    id: 'commentary',
                    title: 'Commentary',
                    type: 'item',
                    url: '/node/Comment',
                    target: false
                },
                {
                    id: 'Essays',
                    title: 'Essays',
                    type: 'item',
                    url: '/node/Essay',
                    target: false
                },
                {
                    id: 'news',
                    title: 'News',
                    type: 'item',
                    url: '/node/NewsArticle',
                    target: false
                },
                {
                    id: 'tvdocumentaries',
                    title: 'TV Documentaries',
                    type: 'item',
                    url: '/node/TV_documentary',
                    target: false
                }
            ]
        },
        {
            id: 'subjects',
            title: 'Subjects',
            type: 'item',
            url: '/node/Topic',
            icon: icons['IconBulb'],
            breadcrumbs: false
        }
    ]
};
