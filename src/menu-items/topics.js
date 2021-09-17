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
                title: 'Social Network Person',
                type: 'item',
                url: '/node/Person',
                icon: icons['IconSocial'],
                breadcrumbs: false
            },
            // {
            //     id: 'social-network',
            //     title: 'Social Network',
            //     type: 'collapse',
            //     icon: icons['IconSocial'],
            //     children: []
            // },
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
    // getSubMenu('Person', 1);
    getSubMenu('Organization', 2);
    getSubMenu('Event', 3);
    getSubMenu('CreativeWork', 4);
    getSubMenu('Topic', 5);
    getSubMenu('Award', 6);
    getSubMenu('MusicalExpression', 7);
    getSubMenu('Document', 8);
    getSubMenu('Item', 9);

    return topic;
};

export let topics = generateTopics();
