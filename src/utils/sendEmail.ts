import nodemailer from 'nodemailer'

export async function sendEmail(to: string, html: string) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL as string, // generated ethereal user
      pass: process.env.PASSWORD as string, // generated ethereal password
    },
  })

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Gallery Application👻"', // sender address
    to: to, // list of receivers
    subject: 'Change password', // Subject line
    html,
  })

  console.log('Message sent: %s', info.messageId)
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
}
