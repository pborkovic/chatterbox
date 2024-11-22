function generateData() {
    const users = {
        'user1': {
            login: 'erkan lecken',
            status: 'online'
        },
        'user2': {
            login: 'saugan meineirn',
            status: 'offline'
        },
        'user3': {
            login: 'ligma balls',
            status: 'online'
        },
        'user4': {
            login: 'dooma ballsfitinyourmouth',
            status: 'online'
        },
        'user5': {
            login: 'mike litoris',
            status: 'offline'
        }
    };


    const channels = {
        'channel1': {
            name: 'Tinder',
            description: 'Dating discussions',
            moderatorIds: ['user1', 'user3'],
            messages: []
        },
        'channel2': {
            name: 'julius-schwester',
            description: 'Julius sister channel',
            moderatorIds: ['user1'],
            messages: []
        },
        'channel3': {
            name: 'Big Nose Club',
            description: 'General chat people with Big noses',
            moderatorIds: ['user2', 'user4'],
            messages: []
        },
        'channel4': {
            name: 'memes',
            description: 'Share your dankest memes about julius nose',
            moderatorIds: ['user3'],
            messages: []
        }
    };

    const servers = {
        'server1': {
            name: 'Julius\' Big nose',
            adminId: 'user1',
            motto: 'Big Nose Energy',
            description: 'A place for Julius and his nose',
            channels: ['channel1', 'channel2']
        },
        'server2': {
            name: 'Cool Kids Club',
            adminId: 'user3',
            motto: 'No normies allowed',
            description: 'Only the dankest memes and coolest people',
            channels: ['channel3', 'channel4']
        }
    };

    const messages = {};
    let msgId = 1;

    const messageContents = [
        "Was macht ein Clown im Büro? Faxen!",
        "Treffen sich zwei Magnete. Sagt der eine: 'Was ziehst du denn für ein Gesicht?'",
        "Warum können Skelette so schlecht lügen? Die sind so durchschaubar!",
        "Was ist grün und steht vor der Tür? Ein Klopfsalat!",
        "Was ist rot und steht im Wald? Ein Parkinggo!",
        "404: Witz nicht gefunden",
        "Meine Nase ist nicht groß, sie ist Feature-reich",
        "Porsche sagt Termin ist um 4:20... nice",
    ];

    Object.keys(channels).forEach(channelId => {
        const messageIds = [];
        for (let i = 0; i < 3; i++) {
            const currentMsgId = `msg${msgId}`;
            messageIds.push(currentMsgId);

            const userId = `user${Math.floor(Math.random() * 5) + 1}`;
            const randomContent = messageContents[Math.floor(Math.random() * messageContents.length)];

            messages[currentMsgId] = {
                date: new Date(Date.now() - Math.random() * 1000000).toISOString(),
                userId: userId,
                userName: users[userId].login,
                content: `${randomContent} (from ${users[userId].login})`
            };

            msgId++;
        }
        channels[channelId].messages = messageIds;
    });

    return { users, servers, channels, messages };
}

module.exports = { generateData };