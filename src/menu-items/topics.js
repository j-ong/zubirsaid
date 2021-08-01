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
//                 target: true
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
                    target: true
                },
                {
                    id: 'majulahsingapura',
                    title: 'Majulah Singapura',
                    type: 'item',
                    url: '/node/Majulah_Singapura-Work',
                    target: true
                },
                {
                    id: 'nasibmalang',
                    title: 'Nasib Malang',
                    type: 'item',
                    url: '/node/Nasib_Malang-Work',
                    target: true
                },
                {
                    id: 'orangsingapura',
                    title: 'Orang Singapura',
                    type: 'item',
                    url: '/node/Orang_Singapura-Work',
                    target: true
                },
                {
                    id: 'sayangdisayang',
                    title: 'Sayang Disayang',
                    type: 'item',
                    url: '/node/Sayang_Disayang-Work',
                    target: true
                },
                {
                    id: 'semogabahagia',
                    title: 'Semoga Bahagia',
                    type: 'item',
                    url: '/node/Semoga_Bahagia-Work',
                    target: true
                }
            ]
        },
        {
            id: 'social-network',
            title: 'Social Network',
            type: 'item',
            url: '/node/Person',
            icon: icons['IconSocial'],
            breadcrumbs: true
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
                    target: true
                },
                {
                    id: 'letters',
                    title: 'Letters',
                    type: 'item',
                    url: '/node/Letter',
                    target: true
                },
                {
                    id: 'speeches',
                    title: 'Speeches',
                    type: 'item',
                    url: '/node/Speech',
                    target: true
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
