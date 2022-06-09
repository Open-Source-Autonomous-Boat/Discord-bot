const { Client } = require('discord.js');
const JSONdb = require('simple-json-db');
const db = new JSONdb('../../database.json');

/**
 * @param {Client} client
 */
module.exports = async (client) => {
  console.log(`Logged in as ${client.user.tag}`); 
    
  const if_has_txt = db.has('status_txt');
  const if_has_type = db.has('status_type');
      
  if (if_has_txt === true) {
    if (if_has_type === true) {

      const status_text = db.get('status_txt');
      const status_type = db.get('status_type');
  
      client.user.setActivity(status_text,{ type: status_type})
    }
  } else {
    client.user.setActivity('https://osab.xyz/',{ type: 'WATCHING'})
  }
  // === clock === //
  setInterval(() => {

    let d = new Date(); // for now
    let hour = d.getHours(); // => 9
    let minute = d.getMinutes(); // =>  30
    
    const time = hour + ":" + minute 
    console.log(time)
    
    //clock to do timed events
    
  }, 60 * 1000); // checks time every minute
  
  // end of ready event
}