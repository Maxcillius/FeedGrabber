const id = 'yvLf91cRahhGeDh2NC3tkg';
const secret = 'ih3cLWlym5cNieuQlcO3YgwHk5o6wQ';

export default async function RefreshToken(refresh_token: string) {

    const params = new URLSearchParams();
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', refresh_token);

    try {
        const response = await fetch('https://www.reddit.com/api/v1/access_token', {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + btoa(`${id}:${secret}`),
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'FeedGrabber/1.0 by Universal_Meme'
        },
        body: params
        });
    
        const data = await response.json();
    
        if (data.access_token) {
            return data.access_token;
        } else {
            throw new Error('Failed to refresh access token');
        }
        } catch (error) {
        console.error('Error refreshing access token:', error);
    }
}