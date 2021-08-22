const error = () => {
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
        background: #EC7063;
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
    </style>
  </head>
  <body>
    <div>
      <h1>Error Processing your Request!!!</h1>
      <h3>Please try again after some Time</h3>
    </div>
  </body>
</html>`
}
module.exports = error