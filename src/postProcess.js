const postProcess=[
    {
        postid: '1-1',
        userid: 1,
        username: 'Ashley',
        avatar: `https://robohash.org/Ashley`,
        title: 'Github repo and the first map for spa project',
        text: 'Hi guys me Ivo and Murad meet last night and we sketched a first map for the SPA project',
        websiteUrl: 'https://github.com/heyitsashleyhere/SPA-TeamProject',
        imageUrl: '',
        isPrivate: false,
        date: 'Monday 01 March 2022',
        comments: [{ userid: 4, text: 'should we all BoR after the break and discuss and plan out the Project?', username: 'Darren', avatar: "https://robohash.org/Darren" }]
    },
    {
        postid: '2-1',
        userid: 2,
        username: 'Ivo',
        avatar: `https://robohash.org/Ivo`,
        title: 'the first sketch',
        text: '',
        websiteUrl: '',
        imageUrl: '/images/order/firstStructureImages.png',
        isPrivate: false,
        date: 'Monday 01 March 2022',
        comments: [{ userid: 1, text: 'It was really nice idea for use excalidraw, we need to know who does what', username: 'Ashley', avatar: "https://robohash.org/Ashley" }]
    },
    {
        postid: '1-2',
        userid: 1,
        username: 'Ashley',
        avatar: `https://robohash.org/Ashley`,
        title: 'scheme of the first map',
        text: 'hey guys I made this scheme to explain the  first sketch',
        websiteUrl: '',
        imageUrl: '/images/order/paththree.png',
        isPrivate: false,
        date: 'Wednesday 02 March 2022',
        comments: [{ userid: 4, text: 'I will start working on a global sass file', username: 'Darren', avatar: "https://robohash.org/Darren" }]
    },
    {
        postid: '5-1',
        userid: 5,
        username: 'Murad',
        avatar: `https://robohash.org/Darren`,
        title: 'Routes',
        text: 'Me and Ashley started to work on the routes',
        websiteUrl: '',
        imageUrl: '/images/order/url.png',
        isPrivate: false,
        date: 'Friday 04 March 2022',
        comments: [{ userid: 1, text: 'Murad can we meet in a BoR?', username: 'Ashley', avatar: "https://robohash.org/Ashley" },]
    },
    {
        postid: '1-3',
        userid: 1,
        username: 'Ashley',
        avatar: `https://robohash.org/Ashley`,
        title: 'final scheme for our webpage',
        text: '',
        website: '',
        imageUrl: '/images/order/lastPath.png',
        isPrivate: false,
        date: 'Friday 04 March 2022',
        comments: [{ userid: 2, text: 'how are you guys with the routes?', username: 'Ivo', avatar: "https://robohash.org/Ivo" },]
    },
    {
        postid: '2-2',
        userid: 2,
        username: 'Ivo',
        avatar: `https://robohash.org/Ivo`,
        title: 'the post and comments? we are changing direction...',
        text: 'Guys we will need a comment section...',
        website: '',
        imageUrl: '/images/order/post.png',
        isPrivate: false,
        date: 'Saturday 05 March 2022',
        comments: [{ userid: 2, text: 'Im happy to hear this...', username: 'Ashley', avatar: "https://robohash.org/Ivo" },]
    },
    {
        postid: '4-1',
        userid: 4,
        username: 'Darren',
        avatar: `https://robohash.org/Darren`,
        title: 'first proposal for logo',
        text: 'Blue and yellow in honor of Ukrain',
        website: '',
        imageUrl: '/images/order/Post-it.png',
        isPrivate: false,
        date: 'Sunday 06 March 2022',
        comments: [{ userid: 3, text: 'you like ?', username: 'Henrik', avatar: "https://robohash.org/Henrik" },]
    },
    {
        postid: '4-2',
        userid: 4,
        username: 'Darren',
        avatar: `https://robohash.org/Darren`,
        title: 'first proposal for landing page',
        text: '',
        website: '',
        imageUrl: '/images/order/firstlogo.png',
        isPrivate: false,
        date: 'Sunday 06 March 2022',
        comments: [{ userid: 2, text: 'great, more time', username: 'Ivo', avatar: "https://robohash.org/Ivo" },]
    },
    {
        postid: '1-4',
        userid: 1,
        username: 'Ashley',
        avatar: `https://robohash.org/Ashley`,
        title: ' ICT for our webpage? ',
        text: '',
        website: 'Guys after some thoughts we decided for Ideas come together: Ict',
        imageUrl: '',
        isPrivate: false,
        date: 'Friday 04 March 2022',
        comments: [{ userid: 2, text: 'new logo suggestions coming', username: 'Ivo', avatar: "https://robohash.org/Ivo" },]
    },
    {
        postid: '5-2',
        userid: 5,
        username: 'Murad',
        avatar: `https://robohash.org/Murad`,
        title: 'other ideas for logos',
        text: '',
        website: '',
        imageUrl: '/images/order/logoIdeas.png',
        isPrivate: false,
        date: 'Monday 07 March 2022',
        comments: [{ userid: 4, text: 'I like the cube what if we put ict on it?', username: 'Darren', avatar: "https://robohash.org/Darren" },]
    },
    {
        postid: '2-3',
        userid: 2,
        username: 'Ivo',
        avatar: `https://robohash.org/Ivo`,
        title: 'Figma proposal',
        text: '.',
        website: '',
        imageUrl: '/images/order/figmaProject.png',
        isPrivate: false,
        date: 'Tuesday 05 March 2022',
        comments: [{ userid: 2, text: 'Im happy to hear this...', username: 'Ashley', avatar: "https://robohash.org/Ivo" },]
    },
    {
        postid: '2-4',
        userid: 2,
        username: 'Ivo',
        avatar: `https://robohash.org/Ivo`,
        title: 'landing page proposal',
        text: '.',
        website: '',
        imageUrl: '/images/order/figmaLandingpage.png',
        isPrivate: false,
        date: 'Tuesday 05 March 2022',
        comments: [{ userid: 2, text: 'Im happy to hear this...', username: 'Ashley', avatar: "https://robohash.org/Ivo" },]
    },
    {
        postid: '3-1',
        userid: 3,
        username: 'Henrik',
        avatar: `https://robohash.org/Henrik`,
        title: 'final Logo',
        text: '',
        website: '',
        imageUrl: '/images/order/figmaLogo.png',
        isPrivate: false,
        date: 'Wednesday 09 March 2022',
        comments: [{ userid: 2, text: 'great, more time', username: 'Ivo', avatar: "https://robohash.org/Ivo" },]
    },
    {
        postid: '1-5',
        userid: 1,
        username: 'Ashley',
        avatar: `https://robohash.org/Ashley`,
        title: 'Push - pull - merge: accept incoming changes!',
        text: '',
        website: '',
        imageUrl: '/images/order/schedules.png',
        isPrivate: false,
        date: 'Saturday 12 March 2022',
        comments: [{ userid: 2, text: 'great, more time', username: 'Ivo', avatar: "https://robohash.org/Ivo" },]
    },
    {
        postid: '5-3',
        userid: 5,
        username: 'Murad',
        avatar: `https://robohash.org/Murad`,
        title: 'hi guys this is my proposal for logo and animations',
        text: '',
        website: '',
        imageUrl: '/images/order/muradbranding-ideas.png',
        isPrivate: false,
        date: 'Sunday 13 March 2022',
        comments: [{ userid: 2, text: 'great, more time', username: 'Ivo', avatar: "https://robohash.org/Ivo" },]
    },
   
]

export default postProcess