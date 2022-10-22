require('dotenv').config()
const axios = require('axios')

module.exports = {
    shorten: async url => {
        try {
            const { data } = await axios.post('https://api-ssl.bitly.com/v4/shorten', {
                'domain': 'bit.ly',
                'long_url': url
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.BITLY_TOKEN}`
                }
            })
            return {
                success: true,
                link: data.link
            }
        } catch (e) {
            return {
                success: false,
                error: 'An error occurred while shortening your URL, please check if your URL is correct.'
                    +`\n(error: ${e.response.data.message})`
            }
        }
    }
}