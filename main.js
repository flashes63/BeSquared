
document.addEventListener("DOMContentLoaded", () => {
    
    const wordList = [['q','a','z','i',
                        'e','j','o','o',
                        'r','a','n','n',
                        'e','x','e','s'], 
                        ['l', 'a', 'c', 'k', 'i', 'r', 'o', 'n', 'm', 'e', 'r', 'e', 'b', 'a', 'k', 'e'],
                        ['l', 'i', 'm', 'b', 'a', 'r', 'e', 'a', 'c', 'o', 'r', 'k', 'k', 'n', 'e', 'e'],
                        ['b', 'a', 'r', 'n', 'a', 'r', 'e', 'a', 'l', 'i', 'a', 'r', 'l', 'a', 'd', 'y'],
                        ['s', 'l', 'a', 'm', 't', 'i', 'l', 'e', 'e', 'a', 't', 's', 'p', 'r', 'o', 's'],
                        ['t', 'a', 'n', 's', 'a', 'r', 'e', 'a', 'l', 'i', 'o', 'n', 'l', 'a', 'n', 'd'],
                        ]
    var wordArray = wordList[1];
    //var wordArray = wordList[Math.floor(Math.random()*wordList.length)]
    console.log(wordArray)
    var remainingArray = [];
    var hintArray = [];
    var clicking = false;
    var filledLetters = [];
    var filledChoices = [];
    
    const helpButton = document.getElementById('helpButton');
    const restartButton = document.getElementById('restartButton');
    const checkButton = document.getElementById('checkButton');
    const hintButton = document.getElementById('hintButton');
    const beforeArrow = document.getElementById("before");
    const nextArrow = document.getElementById("after");
    const congratsButton = document.getElementById('congratsButton');
    var count = document.getElementById('checkCount');
    checkCount = 0;

    helpButton.click();

    const clickSound = new Audio();
    clickSound.src = "./click-6.mp3";

    for( let i = 0; i < 16; i++){
        remainingArray.push(i);
        filledChoices.push('1');
    }

    createSquares();
    function createSquares(){
        const gameBoard = document.getElementById("board");

        for(let i = 0; i <  16; i ++){
            let square = document.createElement('div');
            square.classList.add('square');
            square.setAttribute('id',i);
            gameBoard.appendChild(square);
        }
    
    createAvailableWords();
    function createAvailableWords(){
        for( let j = 0; j < 6; j ++){
            let k = Math.floor(Math.random()*wordArray.length);
                while(hintArray.includes(k)){
                    k = Math.floor(Math.random()*wordArray.length);
                }
                hintArray.push(k);
                let index = remainingArray.indexOf(k);
                if ( index > -1){
                    remainingArray.splice(index, 1);
                }
            }
        }        
    }

    for(i = 0; i < remainingArray.length; i ++){
        k = remainingArray[i];
        document.getElementById(k).classList.add('blank');
        console.log(k);
    }

    createChoice();
    function createChoice(){
        for(let i = 0; i < 10; i ++){
            let choice = document.createElement('button');
            choice.classList.add('choice');
            choice.setAttribute('id', 'c'+i);
            choiceBoard.appendChild(choice);
        }
    }

    displayHints();
    function displayHints(){
        for( let i = 0; i < hintArray.length; i ++){
            k = hintArray[i];
            document.getElementById(k).textContent = wordArray[k];
            document.getElementById(k).style.backgroundColor = "#a8dadc";
            document.getElementById(k).style.border = "2px solid #a8dadc";
            
        }

    displayChoices();
    function displayChoices(){
        remainingArray.sort((a, b) => 0.5 - Math.random());
        for( let i = 0; i < remainingArray.length; i ++){
            k = remainingArray[i];
            document.getElementById('c'+ i).textContent = wordArray[k];
        }
    }


    const blanks = document.querySelectorAll(".blank");
    const choices = document.querySelectorAll(".choice");

    blanks.forEach(square =>{
        square.addEventListener('click', sonclick);
    })

    function sonclick(){
        console.log('click');
        this.className += ' sclick';
        for( let i=0; i< blanks.length; i ++){
            if(blanks[i] != document.getElementById(this.id)){
                blanks[i].className = ' square';
                blanks[i].classList.add('blank');
            }
        }
        clickSound.play();
    }

    function chover(){
        this.style.width = '65px';
        this.style.height = '65px';
    }

    function choverout(){
        this.style.width = '60px';
        this.style.height = '60px';
    }

    function conclick(){
        let num = document.querySelector('.sclick');
        if(num.textContent != null){
            filledChoices[num.id].className = 'choice';
            filledChoices[num.id] = this;
            clickSound.play();
        }
         
        num.textContent = this.textContent;
        filledLetters.push(this.textContent);
        filledChoices.forEach(id => {
            if(id != '1'){
                id.classList.add('invisible');
                id.disabled = true;
            }
        })
        
        for( let i = 0; i < choices.length; i++){
            if(filledChoices.includes(choices[i]) == false){
                choices[i].disabled = false;
            }
        }  
    }
    
    choices.forEach(choice => {
        choice.addEventListener('click', conclick);
        choice.addEventListener('mouseover', chover);
        choice.addEventListener('mouseout', choverout);
    })

    function before(){
        wordArray = wordList[wordList.indexOf(wordArray)-1];
        location.reload();
    }
    
    function next(){
        wordArray = wordList[wordList.indexOf(wordArray)+1];
        location.reload();
    }

    hintButton.addEventListener('click', definition);
    checkButton.addEventListener('click', check);
    restartButton.addEventListener('click', restart);
    beforeArrow.addEventListener('click', before);
    nextArrow.addEventListener('click', next);
    
    function definition(){
        console.log(wordList.indexOf(wordArray));
        switch(wordList.indexOf(wordArray)){
            case 0:
                document.getElementById('a1').textContent = 'magistrate or judge of a Sharia court, who also exercises extrajudicial functions.';
                document.getElementById('a2').textContent = 'fibre of gomuti';
                document.getElementById('a3').textContent = 'a stanza especially of a song';
                document.getElementById('a4').textContent = 'plural form of a former spouse or former partner in an intimate relationship';
                document.getElementById('d1').textContent = 'variant of kere';
                document.getElementById('d2').textContent = 'a Greek hero in the Trojan War who kills himself because the armor of Achilles is awarded to Odysseus';
                document.getElementById('d3').textContent = 'any of five great divisions of the earth\'s surface with respect to latitude and temperature';
                document.getElementById('d4').textContent = 'plural of an atom or group of atoms that carries a positive or negative electric charge';
                break;
            case 1:
                document.getElementById('a1').textContent = 'to be short or have need of something'
                document.getElementById('a2').textContent = 'a silver-white malleable ductile magnetic heavy metallic element that readily rusts in moist air';
                document.getElementById('a3').textContent = 'being nothing more than';
                document.getElementById('a4').textContent = 'to cook by dry heat especially in an oven';
                document.getElementById('d1').textContent = 'a leg or arm of a human being';
                document.getElementById('d2').textContent = 'the scope of a concept, operation, or activity';
document.addEventListener("DOMContentLoaded", () => {
3

4
    const wordList = [['q','a','z','i',
5
                        'e','j','o','o',
6
                        'r','a','n','n',
7
                        'e','x','e','s'], 
8
                        ['l', 'a', 'c', 'k', 'i', 'r', 'o', 'n', 'm', 'e', 'r', 'e', 'b', 'a', 'k', 'e'],
9
                        ['l', 'i', 'm', 'b', 'a', 'r', 'e', 'a', 'c', 'o', 'r', 'k', 'k', 'n', 'e', 'e'],
10
                        ['b', 'a', 'r', 'n', 'a', 'r', 'e', 'a', 'l', 'i', 'a', 'r', 'l', 'a', 'd', 'y'],
11
                        ['s', 'l', 'a', 'm', 't', 'i', 'l', 'e', 'e', 'a', 't', 's', 'p', 'r', 'o', 's'],
12
                        ['t', 'a', 'n', 's', 'a', 'r', 'e', 'a', 'l', 'i', 'o', 'n', 'l', 'a', 'n', 'd'],
13
                        ]
14
    var wordArray = wordList[1];
15
    //var wordArray = wordList[Math.floor(Math.random()*wordList.length)]
16
    console.log(wordArray)
17
    var remainingArray = [];
18
    var hintArray = [];
19
    var clicking = false;
20
    var filledLetters = [];
21
    var filledChoices = [];
22

23
    const helpButton = document.getElementById('helpButton');
24
    const restartButton = document.getElementById('restartButton');
25
    const checkButton = document.getElementById('checkButton');
26
    const hintButton = document.getElementById('hintButton');
27
    const beforeArrow = document.getElementById("before");
28
    const nextArrow = document.getElementById("after");
29
    const congratsButton = document.getElementById('congratsButton');
30
    var count = document.getElementById('checkCount');
31
    checkCount = 0;
32

33
    helpButton.click();
34

35
    const clickSound = new Audio();
36
    clickSound.src = "./click-6.mp3";
37

38
    for( let i = 0; i < 16; i++){
39
        remainingArray.push(i);
40
        filledChoices.push('1');
41
    }
42

43
    createSquares();
44
    function createSquares(){
45
        const gameBoard = document.getElementById("board");
46

47
        for(let i = 0; i <  16; i ++){
48
            let square = document.createElement('div');
49
            square.classList.add('square');
50
            square.setAttribute('id',i);
51
            gameBoard.appendChild(square);
52
        }
53

54
    createAvailableWords();
55
    function createAvailableWords(){
56
        for( let j = 0; j < 6; j ++){
57
            let k = Math.floor(Math.random()*wordArray.length);
58
                while(hintArray.includes(k)){
59
                    k = Math.floor(Math.random()*wordArray.length);
60
                }
61
                hintArray.push(k);
62
                let index = remainingArray.indexOf(k);
63
                if ( index > -1){
64
                    remainingArray.splice(index, 1);
65
                }
66
            }
67
        }        
68
    }
69

70
    for(i = 0; i < remainingArray.length; i ++){
71
        k = remainingArray[i];
72
        document.getElementById(k).classList.add('blank');
73
        console.log(k);
74
    }
75

76
    createChoice();
77
    function createChoice(){
78
        for(let i = 0; i < 10; i ++){
79
            let choice = document.createElement('button');
80
            choice.classList.add('choice');
81
            choice.setAttribute('id', 'c'+i);
82
            choiceBoard.appendChild(choice);
83
        }
84
    }
85

86
    displayHints();
87
    function displayHints(){
88
        for( let i = 0; i < hintArray.length; i ++){
89
            k = hintArray[i];
90
            document.getElementById(k).textContent = wordArray[k];
91
            document.getElementById(k).style.backgroundColor = "#a8dadc";
92
            document.getElementById(k).style.border = "2px solid #a8dadc";
93

94
        }
95

96
    displayChoices();
97
    function displayChoices(){
98
        remainingArray.sort((a, b) => 0.5 - Math.random());
99
        for( let i = 0; i < remainingArray.length; i ++){
100
            k = remainingArray[i];
101
            document.getElementById('c'+ i).textContent = wordArray[k];
102
        }
103
    }
104

105

106
    const blanks = document.querySelectorAll(".blank");
107
    const choices = document.querySelectorAll(".choice");
108

109
    blanks.forEach(square =>{
110
        square.addEventListener('click', sonclick);
111
    })
112

113
    function sonclick(){
114
        console.log('click');
115
        this.className += ' sclick';
116
        for( let i=0; i< blanks.length; i ++){
117
            if(blanks[i] != document.getElementById(this.id)){
118
                blanks[i].className = ' square';
119
                blanks[i].classList.add('blank');
120
            }
121
        }
122
        clickSound.play();
123
    }
124

125
    function chover(){
126
        this.style.width = '65px';
127
        this.style.height = '65px';
128
    }
129

130
    function choverout(){
131
        this.style.width = '60px';
132
        this.style.height = '60px';
133
    }
134

135
    function conclick(){
136
        let num = document.querySelector('.sclick');
137
        if(num.textContent != null){
138
            filledChoices[num.id].className = 'choice';
139
            filledChoices[num.id] = this;
140
            clickSound.play();
141
        }
142

143
        num.textContent = this.textContent;
144
        filledLetters.push(this.textContent);
145
        filledChoices.forEach(id => {
146
            if(id != '1'){
147
                id.classList.add('invisible');
148
                id.disabled = true;
149
            }
150
        })
151

152
        for( let i = 0; i < choices.length; i++){
153
            if(filledChoices.includes(choices[i]) == false){
154
                choices[i].disabled = false;
155
            }
156
        }  
157
    }
158

159
    choices.forEach(choice => {
160
        choice.addEventListener('click', conclick);
161
        choice.addEventListener('mouseover', chover);
162
        choice.addEventListener('mouseout', choverout);
163
    })
164

165
    function before(){
166
        wordArray = wordList[wordList.indexOf(wordArray)-1];
167
        location.reload();
168
    }
169

170
    function next(){
171
        wordArray = wordList[wordList.indexOf(wordArray)+1];
172
        location.reload();
173
    }
174

175
    hintButton.addEventListener('click', definition);
176
    checkButton.addEventListener('click', check);
177
    restartButton.addEventListener('click', restart);
178
    beforeArrow.addEventListener('click', before);
179
    nextArrow.addEventListener('click', next);
180

181
    function definition(){
182
        console.log(wordList.indexOf(wordArray));
183
        switch(wordList.indexOf(wordArray)){
184
            case 0:
185
                document.getElementById('a1').textContent = 'magistrate or judge of a Sharia court, who also exercises extrajudicial functions.';
186
                document.getElementById('a2').textContent = 'fibre of gomuti';
187
                document.getElementById('a3').textContent = 'a stanza especially of a song';
188
                document.getElementById('a4').textContent = 'plural form of a former spouse or former partner in an intimate relationship';
189
                document.getElementById('d1').textContent = 'variant of kere';
190
                document.getElementById('d2').textContent = 'a Greek hero in the Trojan War who kills himself because the armor of Achilles is awarded to Odysseus';
191
                document.getElementById('d3').textContent = 'any of five great divisions of the earth\'s surface with respect to latitude and temperature';
192
                document.getElementById('d4').textContent = 'plural of an atom or group of atoms that carries a positive or negative electric charge';
193
                break;
194
            case 1:
195
                document.getElementById('a1').textContent = 'to be short or have need of something'
196
                document.getElementById('a2').textContent = 'a silver-white malleable ductile magnetic heavy metallic element that readily rusts in moist air';
197
                document.getElementById('a3').textContent = 'being nothing more than';
198
                document.getElementById('a4').textContent = 'to cook by dry heat especially in an oven';
199
                document.getElementById('d1').textContent = 'a leg or arm of a human being';
200
                document.getElementById('d2').textContent = 'the scope of a concept, operation, or activity';
201
                document.getElementById('d3').textContent = 'a usually cork stopper for a bottle or jug';
202
                document.getElementById('d4').textContent = 'a joint in the middle part of the human leg';
203
                break;
204
            case 2:
205
                document.getElementById('a1').textContent = 'a usually large building for the storage of farm products or feed';
206
                document.getElementById('a2').textContent = 'the scope of a concept, operation, or activity';
207
                document.getElementById('a3').textContent = 'a person who tells lies';
208
                document.getElementById('a4').textContent = 'a woman of superior social position';
209
                document.getElementById('d1').textContent = 'a round or roundish body or mass';
210
                document.getElementById('d2').textContent = 'an accompanied, elaborate melody sung (as in an opera) by a single voice';
211
                document.getElementById('d3').textContent = 'to receive or take in the sense of (letters, symbols, etc.) especially by sight or touch';
212
                document.getElementById('d4').textContent = 'not any : not one';
213
                break;         
214
            case 3:
215
                document.getElementById('a1').textContent = 'to shut forcibly and noisily';
216
                document.getElementById('a2').textContent = 'a flat or curved piece of fired clay, stone, or concrete used especially for roofs, or floors';
217
                document.getElementById('a3').textContent = 'third person singular form of the action of taking food or a meal';
218
                document.getElementById('a4').textContent = 'advantages';
219
                document.getElementById('d1').textContent =
220
                document.getElementById('d2').textContent =
221
                document.getElementById('d3').textContent ='the second highest voice part in a 4-part chorus';
222
                document.getElementById('d4').textContent = 'a disordered, untidy, offensive, or unpleasant state or condition';
223
                break;
224
    }}
225

226
    function restart(){
227
        location.reload();
228
    }
229
    function check(){
230
        checkCount += 1;
231
        count.textContent = "Check(s): "  + checkCount;
232
        for(let i = 0; i < 16; i ++){
233
            let currentSquare = document.getElementById(i);
234
            if(currentSquare.textContent == wordArray[i]){
235
                //correct +=1;
236
                currentSquare.style.backgroundColor = '#a8dadc';
237
                currentSquare.style.border = " 2px solid #a8dadc";
238
                currentSquare.removeEventListener('click',sonclick);
239
                if(filledChoices[currentSquare.id] != '1'){
240
                    filledChoices[currentSquare.id] = '1';
241
                }
242
            }else{
243
                currentSquare.textContent = null;
244
                filledChoices[currentSquare.id].className = 'choice';
245
                filledChoices[currentSquare.id].disabled = false;
246
                filledChoices[currentSquare.id] = '1';
247
            }
248
        }
249
        let correct = 16;
250
        if(correct == 16){
251
            document.getElementById('nochecks').textContent = checkCount ;
252
            document.getElementById('congratsPop').style.visibility = 'visible';
253
            document.getElementById('congratsPop').style.opacity = 1;
254
            console.log('c');
255
        }
256
        }
257
    }
258
  }
259
)
