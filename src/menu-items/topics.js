// assets
import {
    IconPlaylist,
    IconSocial,
    IconArchive,
    IconBulb,
    IconBuildingCommunity,
    IconCalendarEvent,
    IconAward,
    IconMap2,
    IconMessageCircle2,
    IconFileMusic,
    IconFiles,
    IconNotebook
} from '@tabler/icons';

//import axios
import axios from 'axios';

// constant
const icons = {
    IconPlaylist: IconPlaylist,
    IconSocial: IconSocial,
    IconArchive: IconArchive,
    IconBulb: IconBulb,
    IconBuildingCommunity: IconBuildingCommunity,
    IconCalendarEvent: IconCalendarEvent,
    IconAward: IconAward,
    IconMap2: IconMap2,
    IconFiles: IconFiles,
    IconMessageCircle2: IconMessageCircle2,
    IconFileMusic: IconFileMusic,
    IconNotebook: IconNotebook
};

//-----------------------|| EXTRA PAGES MENU ITEMS ||-----------------------//

const generateTopics = () => {
    let topic = {
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
                children: []
            },
            {
                id: 'social-network',
                title: 'Social Network',
                type: 'collapse',
                icon: icons['IconSocial'],
                children: []
            },
            {
                id: 'organization',
                title: 'Organizations',
                type: 'collapse',
                icon: icons['IconBuildingCommunity'],
                children: []
            },
            {
                id: 'events',
                title: 'Events',
                type: 'collapse',
                icon: icons['IconCalendarEvent'],
                children: []
            },
            {
                id: 'reply-actions',
                title: 'Reply Actions',
                type: 'collapse',
                icon: icons['IconMessageCircle2'],
                children: []
            },
            // {
            //     id: 'reply-actions',
            //     title: 'Reply Actions',
            //     type: 'item',
            //     url: '/node/ReplyAction',
            //     icon: icons['IconMessageCircle2'],
            //     breadcrumbs: false
            // },
            {
                id: 'genres',
                title: 'Genres',
                type: 'collapse',
                icon: icons['IconArchive'],
                children: []
            },
            {
                id: 'topics',
                title: 'Topics',
                type: 'collapse',
                icon: icons['IconBulb'],
                children: []
            },
            {
                id: 'awards',
                title: 'Awards',
                type: 'collapse',
                icon: icons['IconAward'],
                children: []
            },
            {
                id: 'civic-structure',
                title: 'Civic Structure',
                type: 'collapse',
                icon: icons['IconMap2'],
                children: []
            },
            {
                id: 'musical-expressions',
                title: 'Musical Expressions',
                type: 'collapse',
                icon: icons['IconFileMusic'],
                children: []
            },
            {
                id: 'documents',
                title: 'Documents',
                type: 'collapse',
                icon: icons['IconNotebook'],
                children: []
            },
            {
                id: 'items',
                title: 'Items',
                type: 'collapse',
                icon: icons['IconFiles'],
                children: []
            }
        ]
    };

    //Generate sub menu
    const getSubMenu = async (menuType, index) => {
        const res = await axios.get(`https://chriskhoo.net/ZS/0/${menuType}`);

        var data = res.data;
        var loopData = [];
        for (var i = 0; i < data.length; i++) {
            if (menuType === 'Person' || menuType === 'Event') {
                if (data[i]._fields[2].properties.type === 'Taxonomy') {
                    loopData.push(data[i]._fields[2].properties);
                }
            } else {
                loopData.push(data[i]._fields[2].properties);
            }
        }

        loopData.sort(function (a, b) {
            if (a.label < b.label) {
                return -1;
            }
            if (a.label > b.label) {
                return 1;
            }
            return 0;
        });

        loopData.forEach((menu) => {
            let id = menu.id;
            let label = menu.label;
            topic.children[index].children.push({
                id: id,
                title: label,
                type: 'item',
                url: `/node/${id}`,
                target: false
            });
        });
    };
    getSubMenu('MusicalWork', 0);
    getSubMenu('Person', 1);
    getSubMenu('Organization', 2);
    getSubMenu('Event', 3);
    getSubMenu('ReplyAction', 4);
    getSubMenu('CreativeWork', 5);
    getSubMenu('Topic', 6);
    getSubMenu('Award', 7);
    getSubMenu('Place', 8);
    getSubMenu('MusicalExpression', 9);
    getSubMenu('Document', 10);
    getSubMenu('Item', 11);

    return topic;
};

export let topics = generateTopics();
