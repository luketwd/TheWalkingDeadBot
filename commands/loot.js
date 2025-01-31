const Discord = require("discord.js");
const fs =require('fs');
const { parse } = require("path");
module.exports = {
    name: 'loot',
    description: "Random loot command",
    execute(message, args){
        let rarity = Math.floor(Math.random() * 99);
        let file
        let rarity1 
        let color

        if ( rarity < 50){ // 0 -> 49 50%
             file = `./loot/common.txt`
             color = "#808080"
             rarity1 = "Common Loot"
        } else if (rarity < 85){  // 50 -> 84 35%
             file = `./loot/rare.txt`
             color = "#000399"
             rarity1 = "Rare Loot"
        } else if (rarity < 98){ // 85 -> 98 14% 
             file = `./loot/epic.txt`
             color = "#5e0099"
             rarity1 = "Epic Loot"
        }else {// 1%
             file = `./loot/legendary.txt`
             color = "#def200"
             rarity1 = "Legendary Loot"
        }

        console.log(rarity1)
            



        fs.readFile(file , 'utf8', (err, data) => {
            if(err) return console.log(err)
            
            
            function cLog(msg) {
                return console.log(msg);
            };
            
            function getRandomInt(min, max) {
                min = Math.ceil(min);
                max = Math.floor(max+1);
                return Math.floor(Math.random() * (max - min)) + min;
            };
          
            data = data.split('\n')
            var random = getRandomInt(0,data.length-1)
            
            var loot = data[random]
            

            // Module separation

            var module = loot.split('^')
            
            /*
                module[0]=category
                module[1]=name
                module[2], module[2]=min and max number
                module[4], module[5]=durability/quality max and min
                module[6]= Durability/Quality
                module[7] = icon

            */
           let num1 = parseInt(module[2], 10); 
           let num2 = parseInt(module[3], 10);
           let dur1 = parseInt(module[4], 10); 
           let dur2 = parseInt(module[5], 10)
            if(module[2]==module[3]){
                //set amount of objects
                if(!module[6]){
                        cLog("Path 1a")
                        
                        const path1a = new Discord.MessageEmbed()
                        .setColor(color)
                        .setAuthor(rarity1)
                        .setDescription(`**${message.author.username} just found:**\n` + "`" + `${module[1]}` + "`")
                        .addField(`Category:`, "`" + `${module[0]}` + "`"  , true )
                        .addField(`Count:` , "`1`" ,true )
                        .setTimestamp() 
                        .setThumbnail(URL=module[7])
                   
                        message.channel.send(path1a)
                } else {
                        let dur =getRandomInt(dur1,dur2);
                        cLog("Path 1b");
                       
                        const path2a = new Discord.MessageEmbed()
                        .setColor(color)
                        .setAuthor(rarity1)
                        .setDescription(`**${message.author.username} just found:**\n` + "`" + `${module[1]}` + "`")
                        .addField(`Category:`, "`" + `${module[0]}` + "`", true )
                        .addField( `Count:`, "`1`" ,true )
                        .addField(`${module[6]}:`, "`" +dur+ "%`")
                        .setTimestamp()
                        .setThumbnail(URL=module[7])
                        
                        message.channel.send(path2a);
                }
            }else{
               //random amount of loot
                let n =getRandomInt(num1,num2)
               
                if(!module[6]){
                    //no durability
                    
                        cLog("Path 2")

                        const path2b = new Discord.MessageEmbed()
                        .setColor(color)
                        .setAuthor(rarity1)
                        .setDescription(`**${message.author.username} just found:**\n` + "`" + `${module[1]}` + "`")
                        .addField(`Category:`, "`" + `${module[0]}` + "`", true )
                        .addField( `Count:` , "`" + n + "`" ,true )
                        .setTimestamp() 
                        .setThumbnail(URL=module[7])
                      
                        message.channel.send(path2b)
                    
                }else if(module[6]){
                     //durability

                     let dur =getRandomInt(dur1,dur2)
                    
                        
                        cLog("Path 3")

                        const path3b = new Discord.MessageEmbed()
                        .setColor(color)
                        .setAuthor(rarity1)
                        .setDescription(`**${message.author.username} just found:**\n` + "`" + `${module[1]}` + "`")
                        .addField(`Category:`, "`" + `${module[0]}` + "`", true )
                        .addField( `Count:`, "`" + n + "`" ,true )
                        .addField(`${module[6]}:`, "`" +dur+ "%`")
                        .setTimestamp()
                        .setThumbnail(URL=module[7])
                        
                        message.channel.send(path3b)
                    
              }
            }
        })
    }
}