/**
 * html email template to either reset password or confirm email
 * @param {string} username - username of the user
 * @param {string} url - url to confirm email or reset password
 * @param {string} bodyText - body text of the email
 * @param {string} buttonText - button text of the email
 * @param {string} followUpText - follow up text of the email
 * @returns
 */

export const HTML_TEMPLATE = (
  username: string,
  url: string,
  bodyText: string,
  buttonText: string,
  followUpText?: string
) => {
  return `
      <!DOCTYPE html>
        <html>
        <head>
            <title>Confirm Email</title>
            <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f5f5f5;
                color: #333;
                line-height: 1.6;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                border: 1px solid #ccc;
                background-color: #fff;
                border-radius: 5px;
            }
            .logo {
                text-align: center;
                margin-bottom: 20px;
            }
            .logo img {
                max-width: 150px;
            }
            .message {
                font-size: 18px;
                text-align: center;
                margin-bottom: 30px;
            }
            .button {
                display: inline-block;
                padding: 10px 20px;
                background-color: #5C22C9;
                color: #fff!important;
                text-decoration: none;
                border-radius: 0.5rem;
            }

            .button-container {
                text-align: center;
                margin-bottom: 30px;
            }
            .footer {
                text-align: center;
                margin-top: 30px;
                color: #777;
            }
            </style>
        </head>
        <body>
            <div class="container">
            <div class="message">
                <p>Hi ${username},</p>
                <p>
                ${bodyText}
                </p>
            </div>
            <div class="button-container">
                <a href="${url}" class="button" target="_blank">${buttonText}</a>
            </div>
            <div class="footer">
                <p>
                ${followUpText}
                </p>
                <p>
                If you have any questions or need assistance, please contact our
                support team at jayloabdullahi@gmail.com
                </p>
            </div>
            </div>
        </body>
        </html>
    `;
};
