/*
 -> 2C = Two of Clubs (Tréboles)
 -> 2D = Two of Diamonds
 -> 2H = Two of Head
 -> 2S Two of Spades
 */

(() => {
    'use strict'
    let deck = [];
    const tipos = ['C','D','H','S'];
    const especiales = ['A','J','Q','K'];

    //Referencias HTML

    const btnPedirCarta = document.querySelector('#btnPedirCarta');
    const btnDetenerCarta = document.querySelector('#btnDetener');
    const btnNuevoJuego = document.querySelector('#btnNuevoJuego');
    const valorAcumuladoJugador = document.querySelectorAll('small');
    const divCartasJugador = document.querySelector('#jugador-cartas');
    const divCartasMaquina = document.querySelector('#computadora-cartas');
    let puntosJugador = 0;
    let puntosComputadora = 0;

    const crearDeck = () => {

        for(let i = 2; i <= 10; i++) {
            // deck.push( i + 'C');
            for(let tipo of tipos) {
                deck.push( i + tipo);
            }
        }

        for (let tipo of tipos) {
            for(let especial of especiales){
                deck.push( especial + tipo)
            }
        }

        // console.log(deck);
        //Funciona para barajar cartas
        function shuffle(arr) {
            var i, j, temp;
            for (i = arr.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
            }
            return arr;
        }

        deck = shuffle(deck);
        // console.log(deck);
        return deck;
    }

    crearDeck();


    //Esta funciona permite tomar una carta

    const pedirCarta = () => {
        if(deck.length == 0) {
            throw 'No hay mas cartas en el deck';
        }
        const carta = deck.pop();
        return carta
    //carta debe ser de la baraja
    }

    pedirCarta();

    //Funciona para obtener el valor numerico de la carta
    const valorCarta = (carta) => {
            const valor = carta.substring(0, carta.length - 1);
            return ( isNaN(valor)) ?
                    (valor === 'A') ? 11 : 10
                    : valor * 1;
    }

    //Turno maquina
    const turnoMaquina = ( puntosMinimos) => {

        do {

            const carta = pedirCarta();
            puntosComputadora = puntosComputadora + valorCarta(carta);
            // console.log("Lacarta es: " + carta + "\nCon un valor acumulador de: " + puntosJugador);
            valorAcumuladoJugador[1].innerText = puntosComputadora;

            const imgCarta = document.createElement('img');
            imgCarta.src = `../cartas/${ carta }.png`;
            imgCarta.classList.add('carta');
            divCartasMaquina.append(imgCarta);

            if (puntosMinimos > 21) {
                break;
            }

        } while ( (puntosComputadora < puntosMinimos) && ( puntosMinimos < 21) );

        setTimeout(() => {
            if ( puntosComputadora === puntosMinimos) {
                alert('Nadie Gana :I');
            } else if ( puntosMinimos > 21) {
                alert('Ganador: Computadora');
            }else if ( puntosComputadora > 21) {
                alert('Ganador: Jugador');
            }else{
                alert('Ganador: Computadora')
            }
        }, 10);


    }


    //Eventos

    btnPedirCarta.addEventListener('click', () => {
        const carta = pedirCarta();
        puntosJugador = puntosJugador + valorCarta(carta);
        // console.log("Lacarta es: " + carta + "\nCon un valor acumulador de: " + puntosJugador);
        valorAcumuladoJugador[0].innerText = puntosJugador;


        const imgCarta = document.createElement('img');
        imgCarta.src = `../cartas/${ carta }.png`;
        imgCarta.classList.add('carta');
        divCartasJugador.append(imgCarta);

        if (puntosJugador > 21) {
            console.warn('Perdiste el Juego')
            btnPedirCarta.disabled = true;
            btnDetener.disabled = true;
            turnoMaquina(puntosJugador);
        }else if ( puntosJugador === 21) {
            console.warn('21, genial!');
            btnPedirCarta.disabled = true;
            btnDetener.disabled = true;
            turnoMaquina(puntosJugador);
        }

    });

    btnDetener.addEventListener('click', ()=>{
        btnPedirCarta.disabled = true;
        btnDetener.disabled = true;

        turnoMaquina(puntosJugador);
    })

    btnNuevoJuego.addEventListener('click', () => {

        console.clear();
        deck = [];
        deck = crearDeck();
        puntosJugador = 0;
        puntosComputadora = 0;
        valorAcumuladoJugador[0].innerText = 0;
        valorAcumuladoJugador[1].innerText = 0;

        divCartasJugador.innerHTML='';
        divCartasMaquina.innerHTML='';

        btnPedirCarta.disabled = false;
        btnDetenerCarta.disabled = false;

    })
})();