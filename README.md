# xo-game

set up
  1. clone repository
  
  3. นำไฟล์ xo_game.sql ไปใส่ใน Mysql
  
  5. run

วิธีออกแบบ 
  1. เริ่มทำจากการ ออกแบบตารางใน database สร้างตาราง(หน้าเว็บ)ให้ได้ กดเล่นได้ เช็คเงื่อนไขได้ว่าใครชนะ แล้วค่อยเริ่มทำ bot
  
  3. ทำการสร้างตารางใน database ที่ออกแบบไว้จากนั้นสร้าง entity และ repository ใน project แล้วลอง save ค่าต่างๆลง database
 
  5. นำข้อมูลที่เก็บไว้ในตารางมาทำตาราง history กับหน้า show replay
 
algorithm
  1. การเช็คว่าใครเป็นผู้ชนะแบ่งเป็น 3 เงื่อนไข
    
    ** turn รอบของผู้เล่นมีค่าเป็น x หรือ o
    
    ** ตัวแปร board ใน code ตัวอย่างคือ array ขนาด size*size ที่เก็บจุดกึ่งกลางของแต่ละช่องในตาราง canvas โดยเมื่อถึง turn แล้วช่องไหนถูกเลือก ค่าใน board ของช่องนั้นจะถูกเปลี่ยนค่าเป็น turn นั้นๆ
    
    1.1 array horizontal จะเก็บค่าของแต่ละ column ของ board แล้วเช็คว่าค่าที่เก็บนั้นเท่ากับ turn นั้นทั้งหมดไหม
    
    1.2 array diagonal1 จะเก็บค่าของเส้นทแยงมุมจากซ้ายไปขวา board แล้วเช็คว่าค่าที่เก็บนั้นเท่ากับ turn นั้นทั้งหมดไหม
    
    1.3 array diagonal2 จะเก็บค่าของเส้นทแยงมุมจากขวาไปซ้าย board แล้วเช็คว่าค่าที่เก็บนั้นเท่ากับ turn นั้นทั้งหมดไหม
    
    1.4 vertical เช็คค่าจาก board[แถว] ว่ามีค่าท่ากับ turn นั้นทั้งหมดไหม
    
            for (let i = 0; i < size; i++) {
                let horizontal = new Array();
                for(let j = 0; j < size ; j++) {
                    horizontal.push(board[j][i]);

                    if (j == i) {
                        diagonal1.push(board[i][j]);

                    }

                    if (j == size - i - 1 ) {
                        diagonal2.push(board[i][j]);
                    }
                }
                // Vertical
                if (board[i].every((v,j) => v == turn)) {
                    return true;
                }

                //horizontal
                if (horizontal.every((v,j) => v == turn)) {
                    return true;
                }
            }
            //Diagonal
            if (diagonal1.every((v,j) => v == turn)) {
                return true;
            }
           
            if (diagonal2.every((v,j) => v == turn)) {
                return true;
            }

        }
  
        
  2. param ที่ทำการ save 
 
          name: ชื่อ,
          size: ขนาด,
          character: ค่าที่ผู้เล่นเลือก (x,o),
          firstTurn: x, o ที่เริ่ม,
          winner: x, o ที่ชนะ (ถ้าเสมอ d),
          playerX: {
            x: array ที่เก็บค่า x ตำแหน่งกึ่งกลางของตารางที่ผู้เล่น X เลือก,
            y: array ที่เก็บค่า y ตำแหน่งกึ่งกลางของตารางที่ผู้เล่น X เลือก
          },
          playerO: {
            x: array ที่เก็บค่า x ตำแหน่งกึ่งกลางของตารางที่ผู้เล่น O เลือก,
            y: array ที่เก็บค่า y ตำแหน่งกึ่งกลางของตารางที่ผู้เล่น O เลือก
           }
    
  3. หน้า show replay
  
      3.1 reverse playerX.x, playerX.y, playerO.x, playerO.y
      
      3.2 เช็คขนาดของ playerX.x + playerO.x ถ้าไม่เท่ากับ 0 ให้ เช็คต่อว่าเป็น turn ของใคร (รอบแรกจะใช้ค่า firstTurn) จากนั้น pop ค่า x และ y ของ player คนนั้นมาวาด 
      
      3.3 ทำการสลับ turn วนไปเรื่อยๆจนว่าขนาด playerX.x + playerO.x เท่ากับ 0
    
    
  
