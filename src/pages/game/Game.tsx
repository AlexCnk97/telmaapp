import { IonAlert, IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonInput, IonItem, IonPage, IonTitle, IonToast, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Jugada } from '../../modelos/Jugadas';
import { UsuarioModel } from '../../modelos/Usuario';
import { ScreenOrientation } from '@ionic-native/screen-orientation'
import './game.css';

const Game: React.FC = () => {
    const [nickname, setNickname] = useState("");
    const [nivel, setNivel] = useState("");
    const [numero, setNumero] = useState(0);
    const [toast, setToast] = useState(false);
    const [msg, setMsg] = useState("");
    const [numeroAleatorio, setNumeroAleatorio] = useState(0);
    const [intentos, setIntentos] = useState(0);
    const [showalert, setShowAlert] = useState(false);
    const [win,setWin] = useState(false);
    const history = useHistory();

    ScreenOrientation.unlock();

    ///OnCreate
    useIonViewWillEnter(() => {
        setIntentos(0);
        if (localStorage.getItem("ajustes") != null) {
            const userinfo: UsuarioModel = JSON.parse(localStorage.getItem("ajustes") as string);
            setNickname(userinfo.nickname);
            setNivel(userinfo.nivel);
            if (userinfo.nivel == "Nivel Fácil 1-50") {
                console.log("NIVEL 1")
                setNumeroAleatorio(generarNumeroAleatorio(1, 50));
            }
            if (userinfo.nivel == "Nivel Medio 1-100") {
                console.log("NIVEL 2")
                setNumeroAleatorio(generarNumeroAleatorio(1, 100));
            }
            if (userinfo.nivel == "Nivel Difícil 1-150") {
                console.log("NIVEL 3")
                setNumeroAleatorio(generarNumeroAleatorio(1, 150));
            }
        }
    })

    function generarNumeroAleatorio(min: number, max: number) {
        console.log("SE EJECUTA LA FUNCION");
        let numero = Math.floor((Math.random() * (max - min + 1)) + min);
        console.log(numero, "ESTE")
        return numero;
    }

    function Adivinanza() {
        var trys = intentos + 1;
        console.log(trys)
        setIntentos(trys);
        if (numero == numeroAleatorio) {
            if (localStorage.getItem("jugadas") != null) {
                const jugadas: Jugada[] = JSON.parse(localStorage.getItem("jugadas") as string);
                const Jugadaactual: Jugada = {
                    nickname: nickname,
                    intentos: intentos + 1,
                    nivel: nivel
                }
                jugadas.push(Jugadaactual);
                localStorage.setItem("jugadas", JSON.stringify(jugadas));
            } else {
                const jugadas: Jugada[] = [];
                const Jugadaactual: Jugada = {
                    nickname: nickname,
                    intentos: intentos + 1,
                    nivel: nivel
                }
                jugadas.push(Jugadaactual);
                localStorage.setItem("jugadas", JSON.stringify(jugadas));
            }
            setWin(true);
            setIntentos(0);
            const userinfo: UsuarioModel = JSON.parse(localStorage.getItem("ajustes") as string);
            if (userinfo.nivel == "Nivel Fácil 1-50") {
                console.log("NIVEL 1")
                setNumeroAleatorio(generarNumeroAleatorio(1, 50));
            }
            if (userinfo.nivel == "Nivel Medio 1-100") {
                console.log("NIVEL 2")
                setNumeroAleatorio(generarNumeroAleatorio(1, 100));
            }
            if (userinfo.nivel == "Nivel Difícil 1-150") {
                console.log("NIVEL 3")
                setNumeroAleatorio(generarNumeroAleatorio(1, 150));
            }
        }
        setNumero(0);
    }

    function Adivinar() {
        if (numero) {
            if (nivel == "Nivel Fácil 1-50") {
                if (numero > 0 && numero < 51) {
                    //La adivinanza
                    Adivinanza();
                } else {
                    setMsg("El numero debe estar entre 1 y 50");
                    setToast(true);
                }
            }
            if (nivel == "Nivel Medio 1-100") {
                if (numero > 0 && numero < 101) {
                    //La adivinanza
                    Adivinanza();
                } else {
                    setMsg("El numero debe estar entre 1 y 100");
                    setToast(true);
                }
            }
            if (nivel == "Nivel Difícil 1-150") {
                if (numero > 0 && numero < 151) {
                    //La adivinanza
                    Adivinanza();
                } else {
                    setMsg("El numero debe estar entre 1 y 150");
                    setToast(true);
                }
            }
        } else {
            setMsg("Debes ingresar tu numero");
            setToast(true);
        }
    }
    return (
        <IonPage>
            <IonHeader className="heade2">
                <IonToolbar className="header2">
                    <IonButtons slot="secondary">
                        <IonButton>{nickname}</IonButton>
                    </IonButtons>
                    <IonButtons slot="primary">
                        <IonButton onClick={() => { history.push("/home") }} color="light">Salir</IonButton>
                    </IonButtons>
    <IonTitle>{nivel}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <div className="box">
                    <img src="assets/img/thinking.gif"></img>
                </div>
                <br /><br />
                {/* <IonItem>
                    <IonInput
                        className="inputgame"
                        
                        type="number"
                        value={numero}
                        placeholder="Ingrese su número"
                        clearInput
                        onIonChange={(e: any) => { setNumero(e.detail.value) }}></IonInput>
                </IonItem> */}
                <div className="box">
                    <input
                        value={numero}
                        className="inputseting2"
                        onChange={(e) => { setNumero(parseInt(e.target.value)) }}
                        type="number"
                        placeholder="Escribe el numero" />
                </div>
                <br /><br /><br />
                <br /><br /><br />
                <br /><br /><br />
                <div className="intentoscont">
                    <div className="boxxon">
                        <span className="inttitle">INTENTOS</span>
                        <span className="number">{intentos}</span>
                    </div>
                </div>
                <div hidden={!win} className="box win">
                <h1>Haz ganado!</h1>
                </div>
                <IonToast
                    isOpen={toast}
                    onDidDismiss={() => setToast(false)}
                    message={msg}
                    position="middle"
                    duration={1000}
                />

                <IonAlert
                    isOpen={showalert}
                    onDidDismiss={() => setShowAlert(false)}
                    cssClass='my-custom-class'
                    header={'Has adivinado el numero!'}
                    message={'¿Deseas jugar de nuevo?'}
                    buttons={[
                        {
                            text: 'No',
                            cssClass: 'secondary',
                            handler: () => {
                                history.push("/home");
                            }
                        },
                        {
                            role: 'cancel',
                            text: 'Sí',
                            handler: () => {
                                setIntentos(0);
                                const userinfo: UsuarioModel = JSON.parse(localStorage.getItem("ajustes") as string);
                                if (userinfo.nivel == "Nivel Fácil 1-50") {
                                    console.log("NIVEL 1")
                                    setNumeroAleatorio(generarNumeroAleatorio(1, 50));
                                }
                                if (userinfo.nivel == "Nivel Medio 1-100") {
                                    console.log("NIVEL 2")
                                    setNumeroAleatorio(generarNumeroAleatorio(1, 100));
                                }
                                if (userinfo.nivel == "Nivel Difícil 1-150") {
                                    console.log("NIVEL 3")
                                    setNumeroAleatorio(generarNumeroAleatorio(1, 150));
                                }
                            }
                        }
                    ]}
                />
                
                

<div className="box">
<IonButton className="btna" onClick={() => { setWin(false); Adivinar() }} size="large" expand="block" >Adivinar</IonButton>
</div>

            </IonContent>
            {/* <IonFooter className="ion-no-border">
                <IonToolbar>
                   
                </IonToolbar>
            </IonFooter> */}
        </IonPage>
    );
};

export default Game;