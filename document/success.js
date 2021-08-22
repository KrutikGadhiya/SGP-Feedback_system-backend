const success = () => {
  return `<html>
  <head>
    <title>Success</title>
    <style>
      @import url('https://fonts.googleapis.com/css2family=Poppins:wght@400;500&display=swap');
      *{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        font-family: Poppins, sans-serif;
      }
      body{
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;
      }
      div{
        width: 97vw;
        height: 95vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: #2ECC71;
        border-radius: 0.75em;
      }
      h1{
        text-align: center;
        margin-bottom: 2.5em;
      }
      h3{
        text-align: center;
        margin-bottom: 1em;
      }
      p{
        text-align: center;
        margin-top: 0.3em;
      }
      #a1, #a2{
        text-decoration: none;
        color: #fff;
        padding: 0.25em 0.5em;
        transition: 0.2s ease;
        border-radius: 0.25em;
        border: 1px solid #82E0AA;
      }
      #a1:hover{
        background: #2874A6;
        color: #fff;
      }
      #or{
        padding: 0.25em 0;
      }
      #a2:hover{
        background: #B03A2E;
        color: #fff;
      }
    </style>
  </head>
  <body>
    <div>
      <h1>User Verified Successfully</h1>
      <h3>You can now continue further</h3>
      <a id="a1" href="#"><p>Download the Mobile App</p></a>
      <p id="or">OR</p>
      <a id="a2" href="#"><p>Continue With the Web App</p></a>
    </div>
  </body>
</html>`
}
module.exports = success