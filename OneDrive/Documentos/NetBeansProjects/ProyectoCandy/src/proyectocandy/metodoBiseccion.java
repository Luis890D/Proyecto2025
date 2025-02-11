/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package proyectocandy;

import java.util.Scanner;

/**
 *
 * @author luisd
 */
public class metodoBiseccion {

    Scanner scanner = new Scanner(System.in);

    public void iniciar() {
        // Pedir al usuario la función en una sola línea
        System.out.print("Ingrese la función (ejemplo: 5x + 4x^3 - x^4 + 3x^2): ");
        String funcion = scanner.nextLine().replace(" ", ""); // Eliminar espacios

        // Pedir al usuario el intervalo [a, b]
        System.out.print("Ingrese el valor de a (inicio del intervalo): ");
        double a = scanner.nextDouble();

        System.out.print("Ingrese el valor de b (fin del intervalo): ");
        double b = scanner.nextDouble();

        // Pedir al usuario la tolerancia (error máximo permitido)
        System.out.print("Ingrese la tolerancia (ejemplo: 0.0001): ");
        double tolerancia = scanner.nextDouble();

        // Verificar que f(a) y f(b) tengan signos opuestos
        double fa = evaluarFuncion(funcion, a);
        double fb = evaluarFuncion(funcion, b);

        if (fa * fb >= 0) {
            System.out.println("Error: La función no cambia de signo en el intervalo [" + a + ", " + b + "].");
            System.out.println("f(a) = " + fa + ", f(b) = " + fb);
            System.out.println("Debes elegir un intervalo donde f(a) y f(b) tengan signos opuestos.");
            return;
        }

        // Aplicar el método de bisección
        double raiz = biseccion(funcion, a, b, tolerancia);

        // Mostrar el resultado
        System.out.println("La raíz aproximada es: " + raiz);

        scanner.close();
    }

    // Método para evaluar la función
    public static double evaluarFuncion(String funcion, double x) {
        double resultado = 0;
        String[] terminos = funcion.split("(?=[+-])"); // Dividir la función en términos

        for (String termino : terminos) {
            resultado += evaluarTermino(termino, x); // Evaluar cada término
        }

        return resultado;
    }

    // Método para evaluar un término individual (ejemplo: 5x, -2x^3, 7x^2, etc.)
    public static double evaluarTermino(String termino, double x) {
        // Si el término es solo un número (sin 'x'), devolver ese número
        if (!termino.contains("x")) {
            return Double.parseDouble(termino);
        }

        // Separar el coeficiente del exponente
        String[] partes = termino.split("x\\^?");
        double coeficiente = partes[0].isEmpty() || partes[0].equals("+") ? 1
                : partes[0].equals("-") ? -1 : Double.parseDouble(partes[0]);

        // Calcular el exponente
        int exponente = partes.length > 1 ? Integer.parseInt(partes[1]) : 1;

        // Calcular el valor del término: coeficiente * x^exponente
        return coeficiente * Math.pow(x, exponente);
    }

    // Método de bisección
    public static double biseccion(String funcion, double a, double b, double tolerancia) {
        double fa = evaluarFuncion(funcion, a);
        double fb = evaluarFuncion(funcion, b);
        double c = 0;

        // Verificar que el intervalo sea válido
        if (fa * fb >= 0) {
            throw new IllegalArgumentException("La función no cambia de signo en el intervalo [" + a + ", " + b + "].");
        }

        // Iterar hasta que el intervalo sea menor que la tolerancia
        while (Math.abs(b - a) > tolerancia) {
            c = (a + b) / 2; // Punto medio
            double fc = evaluarFuncion(funcion, c);

            // Si f(c) es cero, hemos encontrado la raíz
            if (fc == 0) {
                break;
            }

            // Decidir en qué subintervalo continuar
            if (fa * fc < 0) {
                b = c;
                fb = fc;
            } else {
                a = c;
                fa = fc;
            }
        }

        return c; // Devolver la raíz aproximada
    }
}
