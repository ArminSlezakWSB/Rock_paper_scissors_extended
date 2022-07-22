// do bitwy mozerz wybrac 3 spelle
/*
SPELLE:
    * ogien
    * lód 
    * natura
    * wiatr (?)
    
    ^^ tarcza - 80 many moze odbic spell przeciwnika lub unieszkodliwic (szansa na to)
    ^^ dodanie zycia - 50 many
    
    ^^ 3 spell specjalny - za 70 many w swojej lepszej wersji (?)
*/
// Co ture odnowa np 10 many
//Zrób wsparcie językowe dla Polski i Anglii
//Na samym pozatku rozpoczecia bitwy zrob flage ustawiona na true( wtedy mozesz walczyc) na koncu przed kliknieciem na skilla sprawdzaj czy flaga jest dalej równa true jesli pasek zycia u kogos bedzie <= 0 ustaw flage na false wyswietl grafike porazki usun klase vs oraz ataki i przekieruj window.scrollTo do ostatniego planu z podziekowaniami.


// Main_List =====[Name,Picture,IsAvaible,ManaCost,LiveCost,Wages]
var SpellsList = [["Flame", "flame_2.png", true, 20, 80, 2],
                  ["Freeze", "freeze.png", true, 20, 80, 0],
                  ["Nature", "nature(n).webp", true, 20, 80, 4],
                  ["Wind", "wind.png", true, 20, 80, 1],
                  ["Thunder", "thunder.png", true, 20, 80, 3]];

//alert(SpellsList[0][0]);
//moze lepiej bedzie brac dane z takiej tabeli


//var spell_icons = ["flame_2.png", "freeze.png", "nature(n).webp", "wind.png", "thunder.png"];
//var Spell = ["Flame", "Freeze", "Nature", "Wind", "Thunder"];
//var avaibleSpells = [true, true, true, true, true];
var spellClear = [false, false, false];
var Spells = document.getElementsByClassName("spellCheckList");
for(let i=0; i<=4; i++)
    {
        Spells[i].classList.add("avaibleSpells");
    }
var YourSpells = new Array(3);
var YourSpellsList = new Array(3);
var EnemySpellsList = new Array(3);

var confirmButton;
var audioInfo;
var ei;

var EnemyRandomTableSpell, EnemyRandomTableAttack, EnemyRandomTableAttackIndex, ActualEnemyAttack, MyJump =0, Mjump, EnemyJump =0, Ejump, YouCanClick = true, EnemyTypeAttackTable, EnemyTypeAttackIndex, MyMana, MyLive, EnemyMana, EnemyLive, EnemyTypeAttack, Mdmgtable, Mdmgindex, Mdmgwages, Mrest, MrestMark, MyDmg, Edmgtable, Edmgindex, Edmgwages, Erest, ErestMark, EnemyDmg, EliveRandom, MliveRandom, failure= false, win= false, mm, ml, em, el ;
var EnemyTableRandomIndex = new Array(3);

function CheckYourSpells(nr)
{
    document.getElementById("spell"+nr).onclick = function()
    {
        if(SpellsList[nr-1][2] == true)
            {
                if(spellClear[0] == false || spellClear[1] == false || spellClear[2] == false)
                    {
                        SpellsList[nr-1][2] = false;
                        Spells[nr-1].classList.add("unavaibleSpells");
                    }
                //console.log(nr);
                for(let i =1; i<=3; i++)
                {
                    if(spellClear[i-1] == false)
                        {
                            //console.log(i);
                            YourSpellsList[i-1] = SpellsList[nr-1];
                            
                            //console.log(YourSpellsList[i-1]);
                            
                            document.getElementById("p"+i).innerHTML = '<img id="pi'+i+'" title="'+YourSpellsList[i-1][0]+'" width="150" height="150"   src="img/spelle/'+YourSpellsList[i-1][1]+'" alt="'+YourSpellsList[i-1][1]+'"><div class="deleteSpell" id="deleteSpell"></div>';
                            spellClear[i-1] = true;
                            
// ***************************************************************************************************
// *******************************************DELETE-SPELLS*******************************************
// ***************************************************************************************************
                            
                            var deleteButton = document.getElementsByClassName("deleteSpell");
    
                            deleteButton[i-1].onclick = function()
                            {
                                YourSpells[i-1] = " ";
                                document.getElementById("p"+i).innerHTML = "";
                                spellClear[i-1] = false;
                                YourSpellsList[i-1][2] = true;
                                Spells[nr-1].classList.remove("unavaibleSpells");
                                Spells[nr-1].classList.add("avaibleSpells");
                                document.getElementById("confirmButton").removeAttribute("class", "confirm");
                                document.getElementById("confirmButton").setAttribute("class", "unconfirm");
                            }
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^DELETE-SPELLS^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                            break;
                        }
                }
                
// ***************************************************************************************************
// ******************************************TRANSFER-SPELLS******************************************
// ***************************************************************************************************
                if(spellClear[0] == true && spellClear[1] == true && spellClear[2] == true)
                    {
                        confirmButton = document.getElementById("confirmButton");
                        confirmButton.setAttribute("class", "confirm");
                        confirmButton.onclick = function()
                        {
                            for(let i = 1; i<=3; i++)
                                {
                                    //My_Spells
                                    document.getElementsByClassName("MySpell")[i-1].innerHTML += '<img title="'+YourSpellsList[i-1][0]+'" width="50" height="50"   src="'+document.getElementById("pi"+i).getAttribute('src')+'" alt="'+document.getElementById("pi"+i).getAttribute('alt')+'">';
                                    YourSpellsList.push(["Shield", "Shield.png", "true", 0, 80, 6]);
                                    YourSpellsList.push(["Lives", "lives.png", "true", 0, 90, 6]);
                                    
                                    //My_Enemy_Spells
                                    EnemyRandomTableSpell = [4, 0, 3, 1, 4, 2, 2, 3, 0, 2, 1, 3, 0, 4, 1];
                                    switch(i)
                                        {
                                            case 1: EnemyTableRandomIndex[i-1] = Math.floor(Math.random()*5);break;
                                            case 2: 
                                                    do
                                                    {
                                                        EnemyTableRandomIndex[i-1] = Math.floor(Math.random()*5);
                                                    }while(EnemyTableRandomIndex[i-2] == EnemyTableRandomIndex[i-1]);break;
                                            case 3:
                                                    do
                                                    {
                                                        EnemyTableRandomIndex[i-1] = Math.floor(Math.random()*5);
                                                    }while((EnemyTableRandomIndex[i-3] == EnemyTableRandomIndex[i-1]) || (EnemyTableRandomIndex[i-2] == EnemyTableRandomIndex[i-1]));break;
                                        }
                                    //console.log("y= " + EnemyTableRandomIndex);
                                    EnemySpellsList[i-1] = SpellsList[EnemyTableRandomIndex[i-1]];
                                    if(i==3)
                                        {
                                            EnemySpellsList.push(["Shield", "Shield.png", "true", 0, 80, 6]);
                                            EnemySpellsList.push(["Lives", "lives.png", "true", 0, 90, 6]);
                                            //console.log(EnemySpellsList);
                                        }                                    
                                    document.getElementsByClassName("my_enemy_spell")[i-1].innerHTML = '<div class="hmm"></div>';
                                    //document.getElementsByClassName("my_enemy_spell")[i-1].classList.remove("spell");
                                    //document.getElementsByClassName("my_enemy_spell")[i-1].innerHTML = '<img   title="'+EnemySpellsList[i-1][0]+'" width="50" height="50"   src="img/spelle/'+EnemySpellsList[i-1][1]+'" alt="'+EnemySpellsList[i-1][1]+'">';
                                    document.getElementsByClassName("my_enemy_spell")[i-1].classList.add("hmm");
                                    
                                   //Scroll_To_Battle         
                                    window.scrollTo(0, window.innerHeight-document.getElementById("plan2").getAttribute("height"));
                                }
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^TRANSFER-SPELLS^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                            
// ***************************************************************************************************
// ***********************************************ATTACK**********************************************
// ***************************************************************************************************
                            
                function attack(SpellNr, HowMana)
                {
                    MyMana = document.getElementById("mymana").value;
                    mm = document.getElementById("mm").textContent;
                    //console.log(MyMana);
                
                   if(SpellNr <=2)
                   {
                      
                   document.getElementsByClassName("p"+HowMana)[SpellNr].onclick = function()
                   {
                       if(YouCanClick == true)
                           {
                               if((HowMana <= MyMana)&&(MyMana>=0))
                        {
                    YouCanClick = false;
                    MyMana -= HowMana; 
                    document.getElementById("mymana").value = MyMana;
                    mm -= HowMana;
                    document.getElementById("mm").textContent = mm;
                       
                    //console.log(MyMana);
                    document.getElementById("MyAttack").innerHTML = '<img width="120" height="120" src="img/spelle/'+YourSpellsList[SpellNr][1]+'"alt="'+YourSpellsList[SpellNr][1]+'">'; 
                    document.getElementById("MyAttack").innerHTML += '<div class="AttackType">'+HowMana+'</div>'; 
                            document.getElementById("vs").classList.add("vs");
                    EnemyMana = document.getElementById("enemyMana").value;
                    em = document.getElementById("em").textContent;
                    if(document.getElementById("enemyLive").value > 500)
                    {
                        if(EnemyMana < 80)
                            {
                                EnemyRandomTableAttack = [0, 1, 0, 2, 0, 1, 2, 0, 2, 1];
                                ei = Math.floor(Math.random()*10);
                                EnemyRandomTableAttackIndex = Math.floor(Math.random()*3);
                            }
                        else if(EnemyMana >= 80)
                            {
                                EnemyRandomTableAttack = [3, 1, 0, 2, 0, 1, 3, 2, 0, 2, 1];
                                ei = Math.floor(Math.random()*11);
                                EnemyRandomTableAttackIndex = Math.floor(Math.random()*4); 
                            }
                           
                    }else{
                        if(EnemyMana < 80)
                            {
                                EnemyRandomTableAttack = [0, 1, 0, 2, 0, 1, 2, 0, 2, 1];
                                EnemyRandomTableAttackIndex = Math.floor(Math.random()*3);
                            }
                        else if(EnemyMana >= 80 && EnemyMana < 90)
                            {
                                EnemyRandomTableAttack = [3, 1, 0, 2, 0, 1, 3, 2, 0, 2, 1];
                                EnemyRandomTableAttackIndex = Math.floor(Math.random()*4);
                            }
                        else if(EnemyMana >= 90)
                            {
                                EnemyRandomTableAttack = [4, 2, 0, 1, 3, 3, 4, 2, 4, 1, 0];
                                EnemyRandomTableAttackIndex = Math.floor(Math.random()*5);
                            }
                        
                   }
                    console.log(" LONG : " + EnemySpellsList[EnemyRandomTableAttack[EnemyRandomTableAttackIndex]]);
                    console.log(" SHORT : " +EnemyRandomTableAttack[ei]);
                    ActualEnemyAttack = EnemySpellsList[EnemyRandomTableAttackIndex];
                     console.log(ActualEnemyAttack);
                    document.getElementById("EnemyAttack").innerHTML = '<img width="120" height="120" src="img/spelle/'+ActualEnemyAttack[1]+'"alt="'+ActualEnemyAttack[1]+'">';
                    if(EnemyRandomTableAttackIndex < 3)
                        {
                            document.getElementsByClassName("my_enemy_spell")[EnemyRandomTableAttackIndex].classList.remove("hmm");
                            document.getElementsByClassName("my_enemy_spell")[EnemyRandomTableAttackIndex].innerHTML = '<img   title="'+ActualEnemyAttack[0]+'" width="50" height="50"   src="img/spelle/'+ActualEnemyAttack[1]+'" alt="'+ActualEnemyAttack[1]+'">';
                            
                            EnemyMana = document.getElementById("enemyMana").value;
                            em = document.getElementById("em").textContent;
                            EnemyTypeAttackTable = [10, 40, 10, 70 , 10, 70, 10, 70, 10 , 10, 70, 10, 40];
                            do
                            {
                                EnemyTypeAttackIndex = Math.floor(Math.random()*11);
                                EnemyTypeAttack = EnemyTypeAttackTable[EnemyTypeAttackIndex];
                            }while(EnemyTypeAttack > EnemyMana);
                            EnemyMana -= EnemyTypeAttack;
                            em -= EnemyTypeAttack;
                            document.getElementById("enemyMana").value = EnemyMana;
                            document.getElementById("em").textContent = em;
                            //console.log("Emana: " + EnemyTypeAttackIndex);
                            document.getElementById("EnemyAttack").innerHTML += '<div class="AttackType">'+EnemyTypeAttackTable[EnemyTypeAttackIndex]+'</div>';
                        }
                    else if(EnemyRandomTableAttackIndex == 3)
                        {
                              
                        
                               EnemyMana = document.getElementById("enemyMana").value;
                               em = document.getElementById("em").textContent;
                               MyLive = document.getElementById("MyLive").value;
                               ml = document.getElementById("ml").textContent;
                               
                               EnemyMana -= EnemySpellsList[EnemyRandomTableAttackIndex][4]; 
                               em -= EnemySpellsList[EnemyRandomTableAttackIndex][4]; 
                               document.getElementById("enemyMana").value = EnemyMana;
                               document.getElementById("em").textContent = em;
                            
                               Mdmgtable = [3, 4, 5, 6, 3, 5, 6, 4, 3, 3, 5, 3];
                               Mdmgindex = Math.floor(Math.random()*12);
                               Mdmgwages = Mdmgtable[Mdmgindex];
                               
                               Mrest = Math.floor(Math.random()*73)+1;
                               MrestMark = Math.floor(Math.random()*2);
                               
                               switch(MrestMark)
                                   {
                                       case 0: Mrest = Mrest; break;
                                       case 1: Mrest *= -1; break;
                                   }
                               
                               MyDmg = ((HowMana * Mdmgtable[Mdmgindex])+Mrest);
                               if(MyDmg < 0)
                                   {
                                       MyDmg = Math.floor(Math.random()*30)+21;
                                   }
                               
                               MyLive -= MyDmg;
                               document.getElementById("MyLive").value = MyLive;
                               ml -= MyDmg;
                               document.getElementById("ml").textContent = ml;
                            
                            function Clearattack()
                           {
                               document.getElementById("MyAttack").innerHTML = '';
                               document.getElementById("EnemyAttack").innerHTML = '';
                               YouCanClick = true;
                           }
                           setTimeout(Clearattack, 1000);
                               
                                
                               
                        }
                    else if(EnemyRandomTableAttackIndex > 3)
                        {
                            
                            EnemyMana = document.getElementById("enemyMana").value;
                            em = document.getElementById("em").textContent;
                            
                            EnemyMana -= EnemySpellsList[EnemyRandomTableAttackIndex][4]; 
                            em -= EnemySpellsList[EnemyRandomTableAttackIndex][4]; 
                            document.getElementById("enemyMana").value = EnemyMana;
                            document.getElementById("em").textContent = em;
                            
                            EliveRandom = Math.floor(Math.random()*600)+201;
                            EnemyLive = document.getElementById("enemyLive").value;
                            el = document.getElementById("el").textContent;
                            
                            EnemyLive += EliveRandom;
                            el += EliveRandom;
                            if(EnemyLive > 1000) EnemyLive = 1000;
                            if(el > 1000) el = 1000;
                            document.getElementById("enemyLive").value = EnemyLive; 
                            document.getElementById("el").textContent = el; 
                            
                            function Clearattack()
                           {
                               document.getElementById("MyAttack").innerHTML = '';
                               document.getElementById("EnemyAttack").innerHTML = '';
                               YouCanClick = true;
                           }
                           setTimeout(Clearattack, 1000);
                                
                            
                        }
// ***************************************************************************************************
// **********************************************WHO-WIN?*********************************************
// ***************************************************************************************************
                      if(EnemyRandomTableAttackIndex <=2)
                          {
                              Mjump = YourSpellsList[SpellNr][5];
                      Ejump = ActualEnemyAttack[5];
                      while(Mjump != Ejump)
                          {
                              Mjump++;
                              if(Mjump>4){Mjump = 0};
                              MyJump++;
                              //console.log(YouCanClick);
                          }
                      Mjump = YourSpellsList[SpellNr][5];
                      Ejump = ActualEnemyAttack[5];
                      while(Mjump != Ejump)
                          {
                              Ejump++;
                              if(Ejump>4){ Ejump = 0};
                              EnemyJump++;
                              //console.log(YouCanClick);
                          }
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^WHO-WIN?^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                       MyLive = document.getElementById("MyLive").value;
                       EnemyLive = document.getElementById("enemyLive").value;
                       ml = document.getElementById("ml").textContent;
                       el = document.getElementById("el").textContent;
                              
                              
                       if(MyJump == EnemyJump)
                           {
                               document.getElementById("vs").innerText = "Draw";
                               function Clearattack()
                               {
                                   document.getElementById("MyAttack").innerHTML = '';
                                   document.getElementById("EnemyAttack").innerHTML = '';
                                   YouCanClick = true;
                               }
                               setTimeout(Clearattack, 1000);
                               
                           }
                           
// ***************************************************************************************************
// ************************************************WIN************************************************
// ***************************************************************************************************
                       if(MyJump < EnemyJump) 
                           {
                               Mdmgtable = [3, 4, 5, 6, 3, 5, 6, 4, 3, 3, 5, 3];
                               Mdmgindex = Math.floor(Math.random()*12);
                               Mdmgwages = Mdmgtable[Mdmgindex];
                               
                               Mrest = Math.floor(Math.random()*73)+1;
                               MrestMark = Math.floor(Math.random()*2);
                               
                               switch(MrestMark)
                                   {
                                       case 0: Mrest = Mrest; break;
                                       case 1: Mrest *= -1;
                                   }
                               
                               MyDmg = ((HowMana * Mdmgtable[Mdmgindex])+Mrest);
                               if(MyDmg < 0)
                                   {
                                       MyDmg = Math.floor(Math.random()*30)+21;
                                   }
                               
                               EnemyLive -= MyDmg;
                               el -= MyDmg;
                               document.getElementById("enemyLive").value = EnemyLive;
                               document.getElementById("el").textContent = el;
                               
                               document.getElementById("vs").innerText = "Winner";
                               
                               function Clearattack()
                               {
                                   document.getElementById("EnemyAttack").innerHTML = '';
                               }
                               setTimeout(Clearattack, 800);
                               function Clearattack2()
                               {
                                   document.getElementById("MyAttack").innerHTML = '';
                                   YouCanClick = true;
                               }
                               setTimeout(Clearattack2, 1500);
                               
                               if(MyLive <= 0 || EnemyLive <= 0)
                                   {
                                       YouCanClick = false;
                                       function scrolltoEnd()
                                       {
                                           window.scrollTo(0, window.innerHeight*2);
                                           if(MyLive <= 0) failure = true;
                                           if(EnemyLive <= 0) win = true;
                                       }
                                       setTimeout(scrolltoEnd, 2000);
                                   }
                           }
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^WIN^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    
                              
// ***************************************************************************************************
// ***********************************************DEFEAT**********************************************
// ***************************************************************************************************
                       if(MyJump > EnemyJump)
                           {
                               Edmgtable = [3, 4, 5, 6, 3, 5, 6, 4, 3, 3, 5, 3];
                               Edmgindex = Math.floor(Math.random()*12);
                               Edmgwages = Edmgtable[Edmgindex];
                               
                               Erest = Math.floor(Math.random()*73)+1;
                               ErestMark = Math.floor(Math.random()*2);
                               
                               switch(ErestMark)
                                   {
                                       case 0: Erest = Erest; break;
                                       case 1: Erest *= -1;break;
                                   }
                               
                               EnemyDmg = ((EnemyTypeAttack * Edmgtable[Edmgindex])+Erest);
                               if(EnemyDmg < 0)
                                   {
                                       EnemyDmg = Math.floor(Math.random()*30)+21;
                                   }
                               
                               MyLive -= EnemyDmg;
                               ml -= EnemyDmg;
                               document.getElementById("MyLive").value = MyLive;
                               document.getElementById("ml").textContent = ml;
                               
                               document.getElementById("vs").innerText = "Defeat";
                               
                               function Clearattack()
                               {
                                   document.getElementById("MyAttack").innerHTML = '';
                               }
                               setTimeout(Clearattack, 800);
                               function Clearattack2()
                               {
                                   document.getElementById("EnemyAttack").innerHTML = '';
                                   YouCanClick = true;
                               }
                               setTimeout(Clearattack2, 1500);
                               
                               if(MyLive <= 0 || EnemyLive <= 0)
                                   {
                                       YouCanClick = false;
                                       function scrolltoEnd()
                                       {
                                           window.scrollTo(0, window.innerHeight*2);
                                           if(MyLive <= 0) failure = true;
                                           if(EnemyLive <= 0) win = true;
                                       }
                                       setTimeout(scrolltoEnd, 2000);
                                   }
                           }
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^DEFEAT^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                       
                       MyJump = 0;
                       EnemyJump = 0;
                              
                       
                          }
                       function manaplus()
                       {
                          MyMana += 15; 
                           if(MyMana > 100) MyMana = 100;
                          document.getElementById("mymana").value = MyMana; 
                           mm += 15; 
                           if(mm > 100) mm = 100;
                          document.getElementById("mm").textContent = mm; 
                           
                          EnemyMana += 15;
                           if(EnemyMana > 100) EnemyMana = 100;
                          document.getElementById("enemyMana").value = EnemyMana;
                           em += 15; 
                           if(em > 100) em = 100;
                          document.getElementById("em").textContent = em;
                           
                       }
                       setTimeout(manaplus, 500);
                       
                        }
                           }

                   }
                      
                 }
                    else
                        {
                            // nr >= 3
                            //MyMana += 20; 
                            //document.getElementById("mymana").value = MyMana;
                            
                            if(SpellNr == 3)
                                {
                                    document.getElementById("MyShield").onclick = function()
                                    {
                                       if(YouCanClick == true)
                                           {
                                               YouCanClick = false;
                                               //if(YouCanClick == true)
                                           //{
                                               //YouCanClick = false;
                                              if((HowMana <= MyMana)&&(MyMana>=0))
                                                {
                                                    MyMana -= HowMana; 
                                                    mm -= HowMana;
                                                    document.getElementById("mymana").value = MyMana;
                                                    document.getElementById("mm").textContent = mm;

                                                    document.getElementById("MyAttack").innerHTML = '<img width="120" height="120" src="img/spelle/'+YourSpellsList[SpellNr][1]+'"alt="'+YourSpellsList[SpellNr][1]+'">';
                                                    
                                                    document.getElementById("vs").classList.add("vs");
                    if(document.getElementById("enemyLive").value > 500)
                    {
                        if(EnemyMana < 80)
                            {
                                EnemyRandomTableAttack = [0, 1, 0, 2, 0, 1, 2, 0, 2, 1];
                                ei = Math.floor(Math.random()*10);
                                EnemyRandomTableAttackIndex = Math.floor(Math.random()*3);
                            }
                        else if(EnemyMana >= 80)
                            {
                                EnemyRandomTableAttack = [3, 1, 0, 2, 0, 1, 3, 2, 0, 2, 1];
                                ei = Math.floor(Math.random()*11);
                                EnemyRandomTableAttackIndex = Math.floor(Math.random()*4); 
                            }
                           
                    }else{
                        if(EnemyMana < 80)
                            {
                                EnemyRandomTableAttack = [0, 1, 0, 2, 0, 1, 2, 0, 2, 1];
                                EnemyRandomTableAttackIndex = Math.floor(Math.random()*3);
                            }
                        else if(EnemyMana >= 80 && EnemyMana < 90)
                            {
                                EnemyRandomTableAttack = [3, 1, 0, 2, 0, 1, 3, 2, 0, 2, 1];
                                EnemyRandomTableAttackIndex = Math.floor(Math.random()*4);
                            }
                        else if(EnemyMana >= 90)
                            {
                                EnemyRandomTableAttack = [4, 2, 0, 1, 3, 3, 4, 2, 4, 1, 0];
                                EnemyRandomTableAttackIndex = Math.floor(Math.random()*5);
                            }
                        
                   }
                    ActualEnemyAttack = EnemySpellsList[EnemyRandomTableAttackIndex];
                    document.getElementById("EnemyAttack").innerHTML = '<img width="120" height="120" src="img/spelle/'+ActualEnemyAttack[1]+'"alt="'+ActualEnemyAttack[1]+'">';
                    if(EnemyRandomTableAttackIndex < 3)
                        {
                            document.getElementsByClassName("my_enemy_spell")[EnemyRandomTableAttackIndex].classList.remove("hmm");
                            document.getElementsByClassName("my_enemy_spell")[EnemyRandomTableAttackIndex].innerHTML = '<img   title="'+ActualEnemyAttack[0]+'" width="50" height="50"   src="img/spelle/'+ActualEnemyAttack[1]+'" alt="'+ActualEnemyAttack[1]+'">';
                            
                            EnemyMana = document.getElementById("enemyMana").value;
                            em = document.getElementById("em").textContent;
                            EnemyTypeAttackTable = [70, 40, 10, 10 , 10, 10, 10, 40, 10 , 40, 10, 10, 40];
                            do
                            {
                                EnemyTypeAttackIndex = Math.floor(Math.random()*11);
                                EnemyTypeAttack = EnemyTypeAttackTable[EnemyTypeAttackIndex];
                            }while(EnemyTypeAttack > EnemyMana);
                            EnemyMana -= EnemyTypeAttack;
                            em -= EnemyTypeAttack;
                            document.getElementById("enemyMana").value = EnemyMana;
                            document.getElementById("em").textContent = em;
                            //console.log("Emana: " + EnemyTypeAttackIndex);
                            document.getElementById("EnemyAttack").innerHTML += '<div class="AttackType">'+EnemyTypeAttackTable[EnemyTypeAttackIndex]+'</div>';
                        }
                    else if(EnemyRandomTableAttackIndex > 3)
                        {
                            
                            EnemyMana = document.getElementById("enemyMana").value;
                            em = document.getElementById("em").textContent;
                            
                            EnemyMana -= EnemySpellsList[EnemyRandomTableAttackIndex][4];
                            em -= EnemySpellsList[EnemyRandomTableAttackIndex][4];
                            document.getElementById("enemyMana").value = EnemyMana;
                            document.getElementById("em").textContent = em;
                            
                            EliveRandom = Math.floor(Math.random()*600)+201;
                            EnemyLive = document.getElementById("enemyLive").value;
                            el = document.getElementById("el").textContent;
                            
                            EnemyLive += EliveRandom;
                            el += EliveRandom;
                            if(EnemyLive > 1000) EnemyLive = 1000;
                            if(el > 1000) el = 1000;
                            document.getElementById("enemyLive").value = EnemyLive; 
                            document.getElementById("el").textContent = el; 
                                
                            
                        }
                               EnemyLive = document.getElementById("enemyLive").value;
                               el = document.getElementById("el").textContent;
                                                    
                               Edmgtable = [3, 4, 5, 6, 3, 5, 6, 4, 3, 3, 5, 3];
                               Edmgindex = Math.floor(Math.random()*12);
                               Edmgwages = Edmgtable[Edmgindex];
                               
                               Erest = Math.floor(Math.random()*73)+1;
                               ErestMark = Math.floor(Math.random()*2);
                               
                               switch(ErestMark)
                                   {
                                       case 0: Erest = Erest; break;
                                       case 1: Erest *= -1;break;
                                   }
                               
                               EnemyDmg = ((EnemyTypeAttack * Edmgtable[Edmgindex])+Erest);
                               if(EnemyDmg < 0)
                                   {
                                       EnemyDmg = Math.floor(Math.random()*30)+21;
                                   }
                               
                               EnemyLive -= EnemyDmg;
                               document.getElementById("enemyLive").value = EnemyLive;
                                                    
                               function Clearattack()
                               {
                                   document.getElementById("MyAttack").innerHTML = '';
                                   document.getElementById("EnemyAttack").innerHTML = '';
                                   YouCanClick = true;
                               }
                               setTimeout(Clearattack, 1000);
                               
                               document.getElementById("vs").innerText = "Defeat";
                                                    
                                       if(MyLive <= 0 || EnemyLive <= 0)
                                   {
                                       YouCanClick = false;
                                       function scrolltoEnd()
                                       {
                                           window.scrollTo(0, window.innerHeight*2);
                                           if(MyLive <= 0) failure = true;
                                           if(EnemyLive <= 0) win = true;
                                       }
                                       setTimeout(scrolltoEnd, 2000);
                                   }




                                                    function manaplus()
                                                    {
                                                      MyMana += 15; 
                                                       if(MyMana > 100) MyMana = 100;
                                                      document.getElementById("mymana").value = MyMana; 

                                                      EnemyMana += 15;
                                                       if(EnemyMana > 100) EnemyMana = 100;
                                                      document.getElementById("enemyMana").value = EnemyMana;
                                                    }
                                                    setTimeout(manaplus, 500);
                                                    //YouCanClick = true;
                                                } 
                                               
                                           //}
                                           }
                                       
                                    }
                                        
                                    
                                }  
                            if(SpellNr == 4)
                                {
                                    MyLive = document.getElementById("MyLive").value;
                                    EnemyLive = document.getElementById("enemyLive").value;
                                    EnemyMana = document.getElementById("enemyMana").value;
                                    MyMana = document.getElementById("mymana").value;
                                    
                                    document.getElementById("MliveSpell").onclick = function()
                                    {
                                        if((HowMana <= MyMana)&&(MyMana>=0))
                                                    {
                                        if(YouCanClick == true)
                                            {
                                                YouCanClick = false;
                                                
                                                    MyMana -= HowMana; 
                                                    document.getElementById("mymana").value = MyMana;

                                                    document.getElementById("MyAttack").innerHTML = '<img width="120" height="120" src="img/spelle/'+YourSpellsList[SpellNr][1]+'"alt="'+YourSpellsList[SpellNr][1]+'">';

                                                    document.getElementById("vs").classList.add("vs");
                                                        if(document.getElementById("enemyLive").value > 500)
                    {
                        if(EnemyMana < 80)
                            {
                                EnemyRandomTableAttack = [0, 1, 0, 2, 0, 1, 2, 0, 2, 1];
                                ei = Math.floor(Math.random()*10);
                                EnemyRandomTableAttackIndex = Math.floor(Math.random()*3);
                            }
                        else if(EnemyMana >= 80)
                            {
                                EnemyRandomTableAttack = [3, 1, 0, 2, 0, 1, 3, 2, 0, 2, 1];
                                ei = Math.floor(Math.random()*11);
                                EnemyRandomTableAttackIndex = Math.floor(Math.random()*4); 
                            }
                           
                    }else{
                        if(EnemyMana < 80)
                            {
                                EnemyRandomTableAttack = [0, 1, 0, 2, 0, 1, 2, 0, 2, 1];
                                EnemyRandomTableAttackIndex = Math.floor(Math.random()*3);
                            }
                        else if(EnemyMana >= 80 && EnemyMana < 90)
                            {
                                EnemyRandomTableAttack = [3, 1, 0, 2, 0, 1, 3, 2, 0, 2, 1];
                                EnemyRandomTableAttackIndex = Math.floor(Math.random()*4);
                            }
                        else if(EnemyMana >= 90)
                            {
                                EnemyRandomTableAttack = [4, 2, 0, 1, 3, 3, 4, 2, 4, 1, 0];
                                EnemyRandomTableAttackIndex = Math.floor(Math.random()*5);
                            }
                        
                   }
                                                        
                        ActualEnemyAttack = EnemySpellsList[EnemyRandomTableAttackIndex];
                        document.getElementById("EnemyAttack").innerHTML = '<img width="120" height="120" src="img/spelle/'+ActualEnemyAttack[1]+'"alt="'+ActualEnemyAttack[1]+'">';
                                                        if(EnemyRandomTableAttackIndex < 3)
                        {
                            document.getElementsByClassName("my_enemy_spell")[EnemyRandomTableAttackIndex].classList.remove("hmm");
                            document.getElementsByClassName("my_enemy_spell")[EnemyRandomTableAttackIndex].innerHTML = '<img   title="'+ActualEnemyAttack[0]+'" width="50" height="50"   src="img/spelle/'+ActualEnemyAttack[1]+'" alt="'+ActualEnemyAttack[1]+'">';
                            
                            EnemyMana = document.getElementById("enemyMana").value;
                            EnemyTypeAttackTable = [70, 40, 10, 10 , 10, 10, 10, 40, 10 , 40, 10, 10, 40];
                            do
                            {
                                EnemyTypeAttackIndex = Math.floor(Math.random()*11);
                                EnemyTypeAttack = EnemyTypeAttackTable[EnemyTypeAttackIndex];
                            }while(EnemyTypeAttack > EnemyMana);
                            EnemyMana -= EnemyTypeAttack;
                            document.getElementById("enemyMana").value = EnemyMana;
                            //console.log("Emana: " + EnemyTypeAttackIndex);
                            document.getElementById("EnemyAttack").innerHTML += '<div class="AttackType">'+EnemyTypeAttackTable[EnemyTypeAttackIndex]+'</div>';
                        }
                                                        else if(EnemyRandomTableAttackIndex == 3)
                                                            {
                                                                var x = 0;
                                                            }
                    else if(EnemyRandomTableAttackIndex > 3)
                        {
                            
                            EnemyMana = document.getElementById("enemyMana").value;
                            
                            EnemyMana -= EnemySpellsList[EnemyRandomTableAttackIndex][4]; 
                            document.getElementById("enemyMana").value = EnemyMana;
                            
                            EliveRandom = Math.floor(Math.random()*600)+201;
                            EnemyLive = document.getElementById("MyLive").value;
                            
                            EnemyLive += EliveRandom;
                            if(EnemyLive > 1000) EnemyLive = 1000;
                            document.getElementById("MyLive").value = EnemyLive; 
                                
                            
                        }
                                         MyMana -= HowMana; 
                            document.getElementById("mymana").value = MyMana;
                            
                            MliveRandom = Math.floor(Math.random()*600)+301;
                            MyLive = document.getElementById("MyLive").value;
                            
                            MyLive += MliveRandom;
                            if(MyLive > 1000) MyLive = 1000;
                            document.getElementById("MyLive").value = EnemyLive;                
                                                        
                                                    function manaplus()
                                                    {
                                                        EnemyMana = document.getElementById("enemyMana").value;
                                    MyMana = document.getElementById("mymana").value;
                                                        
                                                      MyMana += 15; 
                                                       if(MyMana > 100) MyMana = 100;
                                                      document.getElementById("mymana").value = MyMana; 
                                                     

                                                      EnemyMana += 15;
                                                       if(EnemyMana > 100) EnemyMana = 100;
                                                      document.getElementById("enemyMana").value = EnemyMana;
                                                    }
                                                    setTimeout(manaplus, 500);                        
                                                        
                                                        function Clearattack()
                               {
                                   document.getElementById("MyAttack").innerHTML = '';
                                   document.getElementById("EnemyAttack").innerHTML = '';
                                   YouCanClick = true;
                               }
                               setTimeout(Clearattack, 1000);
                                                        
                                                    }
                                                
                                                
                                            }
                                    }
                                }
                        }
                    
                }
                            attack(0,10);attack(0,40);attack(0,70);
                            attack(1,10);attack(1,40);attack(1,70);
                            attack(2,10);attack(2,40);attack(2,70);
                            attack(3,80);
                            attack(4,90);
                            
                            document.getElementById("plan3").onmouseover = function()
                            {
                                if(failure == true)
                                    {
                                        document.getElementById("result").textContent = 'Niestety Przegrałeś';
                                    }
                                if(win == true)
                                    {
                                        document.getElementById("result").textContent = 'Brawo! Jesteś zwycięscą';
                                    }
                            }
                        } 
                    }
            }else{
                console.log("unavaibleSpells");
            }
    }
}

CheckYourSpells(1);
CheckYourSpells(2);
CheckYourSpells(3);
CheckYourSpells(4);
CheckYourSpells(5);

var Click_me = true;

document.getElementById("myself").onmouseover = function()
{
    if(Click_me == true)
        {
            audioInfo = new Audio;
                    if(document.getElementById("html").getAttribute("lang") == "pl")
                        {
                            audioInfo.src = "audio/info_pl.mp3";
                        }else if(document.getElementById("html").getAttribute("lang") == "en")
                            {
                                audioInfo.src = "audio/info_en.mp3";
                            }
                    audioInfo.play();
            Click_me = false;
        }                
}