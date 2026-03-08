exports.handler = async function (event) {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let data;
  try {
    data = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: 'Invalid request' };
  }

  const { name, email, message } = data;

  if (!name || !email || !message) {
    return { statusCode: 400, body: 'Missing required fields' };
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'The Game Keeper <contact@the-gamekeeper.com>',
      to: 'willow.dominion@gmail.com',
      reply_to: email,
      subject: `New message from ${name} — The Game Keeper`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; padding: 2rem; background: #f5f0e8; color: #1a1410;">
          <div style="border-bottom: 2px solid #c4972a; padding-bottom: 1rem; margin-bottom: 1.5rem;">
            <h2 style="margin: 0; font-size: 1.4rem;">New message via The Game Keeper</h2>
            <p style="margin: 0.3rem 0 0; font-size: 0.8rem; color: #7a7060; font-family: monospace; letter-spacing: 0.1em; text-transform: uppercase;">the-gamekeeper.com · Contact Form</p>
          </div>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 1.5rem;">
            <tr>
              <td style="padding: 0.5rem 0; font-size: 0.75rem; color: #7a7060; font-family: monospace; text-transform: uppercase; letter-spacing: 0.1em; width: 80px;">From</td>
              <td style="padding: 0.5rem 0; font-size: 0.95rem;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 0.5rem 0; font-size: 0.75rem; color: #7a7060; font-family: monospace; text-transform: uppercase; letter-spacing: 0.1em;">Email</td>
              <td style="padding: 0.5rem 0; font-size: 0.95rem;"><a href="mailto:${email}" style="color: #8b3a1c;">${email}</a></td>
            </tr>
          </table>
          <div style="background: #e8dfc8; padding: 1.25rem; border-left: 3px solid #c4972a;">
            <p style="font-size: 0.75rem; color: #7a7060; font-family: monospace; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 0.75rem;">Message</p>
            <p style="margin: 0; font-size: 0.95rem; line-height: 1.7;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          <p style="margin-top: 1.5rem; font-size: 0.75rem; color: #7a7060; font-family: monospace;">Reply directly to this email to respond to ${name}.</p>
        </div>
      `
    })
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('Resend error:', error);
    return { statusCode: 500, body: 'Failed to send email' };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true })
  };
};
