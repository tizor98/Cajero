class Money {
    constructor(v,c) {
        this.valor = v;
        this.cantidad = c;
    }
}

// Total de dinero disponible
// Para aumentar o disminuir la denominación de billetes se puede agregar o quitar desde aquí
// No es necesario editar el resto del código
let dinero = [];
dinero.push(new Money(100, 6));
dinero.push(new Money(50, 10));
dinero.push(new Money(20, 20));
dinero.push(new Money(10,20));
let totalDinero = sumarDinero(dinero);

// Crear recepción de solicitud de dinero
let cantidadSolicitada = document.getElementById("cantidad");
let dineroSolicitado = document.getElementById("solicitudDinero");
dineroSolicitado.addEventListener("click", darDinero);

// Preparar variable sobre la que se reestribirá el resultado
let resultado = document.getElementById("resultado1");
let resultado2 = document.getElementById("resultado2");

function darDinero() {
    let d = parseInt(cantidadSolicitada.value);
    if(d > totalDinero) {
        resultado.innerHTML = "En este momento no podemos entrarte esta cantidad de dinero. Por favor elige un monto menor o igual a " + totalDinero;
        resultado2.innerHTML = "";
    } else if(d%10 !=0 || d<0) {
        resultado.innerHTML = "Por favor, elige solo un monto multiplo de $10";
        resultado2.innerHTML = "";
    } else {
        // Algoritmo para calcular cantidad de billetes a entregar
        let faltante = d;
        let billetes = [];
        for(let b of dinero) {
            let k = b.valor.toString();
            billetes[k] = Math.floor(faltante / b.valor);
            if(billetes[k] > b.cantidad) {
                billetes[k] = b.cantidad;
            }
            faltante -= billetes[k] * b.valor;
        }
        if(faltante != 0) {
            let mensajeCantidad = d-faltante;
            if(mensajeCantidad == 0) {
                for(let c of dinero) {
                    if(c.cantidad > 0) mensajeCantidad = c.valor;
                }
            }
            resultado.innerHTML = "En este momento no podemos entregarte esta cantidad de dinero, por favor prueba con " + mensajeCantidad;
            resultado2.innerHTML = "";
            return console.log("No se tiene combinación de dinero suficiente para atender solicitud");
        }

        // Impresión del resultado
        let texto = "Billete(s) de $"
        resultado.innerHTML = "El total de " + d + " será entregado de la siguiente forma:<br/>"
        resultado2.innerHTML = "";
        for(let b of dinero) {
            let k = b.valor.toString();
            b.cantidad -= billetes[k];
            resultado2.innerHTML += texto+k+": "+billetes[k]+"<br/>";
        }
    
        // Para actualizar la cantidad de dinero disponible
        totalDinero = sumarDinero(dinero);
    }
}

function sumarDinero(lista) {
    let total = 0;
    for(let billete of lista) {
        total += billete.valor * billete.cantidad;
    }
    return total;
}