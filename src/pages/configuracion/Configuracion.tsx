import { IonBackButton, IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonInput, IonItem, IonItemDivider, IonLabel, IonList, IonListHeader, IonPage, IonRadio, IonRadioGroup, IonSelect, IonSelectOption, IonTitle, IonToast, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import { SSL_OP_CIPHER_SERVER_PREFERENCE } from 'constants';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { UsuarioModel } from '../../modelos/Usuario';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import './configuracion.css';


const Configuracion: React.FC = () => {
    const [nickname, setNickname] = useState("");
    const [nivel, setNivel] = useState("");
    const [toast, setShowToast] = useState(false);
    const history = useHistory();

    //Android -> OnCreate, OnPause, OnDestroy
    //Hibrida -> 

    ScreenOrientation.lock(ScreenOrientation.ORIENTATIONS.PORTRAIT);

    useIonViewWillEnter(() => {
        ScreenOrientation.unlock();
    })

    useIonViewWillEnter(() => {
        if (localStorage.getItem("ajustes") != null) {
            const userinfo: UsuarioModel = JSON.parse(localStorage.getItem("ajustes") as string);
            setNickname(userinfo.nickname);
            setNivel(userinfo.nivel);
        }
    })

    function GuardarInformacion() {
        const userinfo: UsuarioModel = {
            nickname: nickname,
            nivel: nivel
        }
        localStorage.setItem("ajustes", JSON.stringify(userinfo));
    }

    function JugarAhora() {
        if (nickname != "" && nivel != "") {
            GuardarInformacion();
            alert("Se ha guardado la informacion")
        } else {
            setShowToast(true);
        }
    }

    return (
        <IonPage>
            <IonHeader className="header">
                <IonToolbar className="header">
                
        <IonButtons slot="start">
          <IonBackButton defaultHref="home" />
        </IonButtons>
                    <IonTitle className="titleheader">Configuración</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <br /><br />
                <div className="box">
                    <input
                        className="inputseting"
                        type="text"
                        value={nickname}
                        onChange={(e) => { setNickname((e.target.value)) }}></input>
                </div>
                <br /><br />
                <br />
                <IonItem>
                    <IonLabel className="title">Seleccione nivel</IonLabel>
                    <IonSelect value={nivel} placeholder="Selecionar" onIonChange={e => setNivel(e.detail.value)}>
                        <IonSelectOption value="Nivel Fácil 1-50">Nivel Fácil 1-50</IonSelectOption>
                        <IonSelectOption value="Nivel Medio 1-100">Nivel Medio 1-100</IonSelectOption>
                        <IonSelectOption value="Nivel Difícil 1-150">Nivel Difícil 1-150</IonSelectOption>
                    </IonSelect>
                </IonItem>
                <IonToast
                    isOpen={toast}
                    onDidDismiss={() => setShowToast(false)}
                    message="Debes agregar tu nikcname y seleccionar el nivel del juego"
                    position="top"
                    duration={1000}
                />
                <div className="box">
                <IonButton className="btncolor" onClick={() => { JugarAhora() }} fill="outline"  size="large" expand="block" >Guardar Ajustes</IonButton>
                </div>
            </IonContent>
            
        </IonPage>
    );
};

export default Configuracion;