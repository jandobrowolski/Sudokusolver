
//rozwiązywacz sudoku - Jan Dobrowolski
//w oparcziu o: http://moriel.smarterthanthat.com/tips/javascript-sudoku-backtracking-algorithm/

function inicjacja_tabeli()
{
	var rozmiar=9;
	var i=0;
	var j;
	for (i; i<rozmiar; i++)
	{
		j=0;
		var wiersz = document.createElement('tr');
		for (j; j<rozmiar; j++)
		{
			var znacznik = document.createElement('input');
			znacznik.id=('x'+(j+1)+'y'+(i+1));
			znacznik.style.borderColor = "#eeeeee";
			if(((i<3 || i>5)&&(j<3 || j>5))||(i>2&&i<6&&j>2&&j<6))
				znacznik.style.backgroundColor = "#eeeeee";
			wiersz.appendChild(znacznik);
		}
		document.getElementById("sudoku").appendChild(wiersz);
	}
}



var grid = [
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0]
			];
function main()	//przepisanie tablicy do pamieci, rozwiazanie i z pamieci do tablicy
{
	var str;
	for(var wie=0; wie<9; wie++)
	{
		for(var kol=0; kol<9; kol++)
		{
			if(document.getElementById('x'+(kol+1)+'y'+(wie+1)).value!='')
			{
				grid[wie][kol]=parseInt(document.getElementById('x'+(kol+1)+'y'+(wie+1)).value);
				str=true;
			}
		}
	}
	if(str==true)
	{
		if(solveSudoku()==false)
			document.getElementById("test").innerHTML = "Blad! Nieprawidlowe sudoku!";
	}
	else
	{
		document.getElementById("test").innerHTML = "Blad! Napisz cos :)";
	}
	console.log(grid);
	for(var wiersz=0; wiersz<9; wiersz++)
	{
		for(var kol=0; kol<9; kol++)
		{
			if(grid[wiersz][kol]!=0)
				document.getElementById('x'+(kol+1)+'y'+(wiersz+1)).value = grid[wiersz][kol];
		}
	}
}
function solveSudoku()		//funkcja rozwiązująca metodą backtrackingu
{
    var cell = znajdzPuste();
    var wie = cell[0];
    var kol = cell[1]; 
    if (wie == -1)
	{
        console.log("solved");
        return true;
    }

    for (var num = 1; num <= 9; num++)
	{
        if ( sprawdzKonflikt(wie, kol, num) )
		{   
            grid[wie][kol] = num;
            if ( solveSudoku() )
			{
                return true;
            }    
            grid[wie][kol] = 0;
        }
    }
    return false;
}

function znajdzPuste() {
    for (var i=0; i<9; i++)
	{
        for (var j=0; j<9 ; j++)
            if (grid[i][j]==0)
                return [i, j];
		j=0;
	}
    return [-1, -1];
}

function sprawdzKonflikt(wie, kol, num) {
	if(sprawdzWiersz(wie, num)==true && sprawdzKolumne(kol, num)==true && sprawdzKwadrat(wie, kol, num)==true)
		return true;
	else
		return false;
}

function sprawdzWiersz(wie, num) {
    for (var kol = 0; kol < 9; kol++)
        if (grid[wie][kol] == num)
            return false;

    return true;
}
function sprawdzKolumne(kol, num) {
    for (var wie = 0; wie < 9; wie++)
    if (grid[wie][kol] == num)
        return false;

    return true;    
}
function sprawdzKwadrat(wie, kol, num) {
    wie = Math.floor(wie / 3) * 3;
	kol = Math.floor(kol / 3) * 3;

    for (var w = 0; w < 3; w++)
        for (var k = 0; k < 3; k++)
            if (grid[wie + w][kol + k] == num)
                return false;

    return true;
}