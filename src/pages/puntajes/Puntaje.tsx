import { IonBackButton, IonBadge, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonThumbnail, IonTitle, IonToolbar, useIonViewDidLeave, useIonViewWillEnter } from '@ionic/react'
import React, { useState } from 'react'
import { Jugada } from '../../modelos/Jugadas'
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import './puntaje.css';


const Puntaje: React.FC = () => {
    const [jugadas, setJugadas] = useState<Jugada[]>([]);


    ScreenOrientation.lock(ScreenOrientation.ORIENTATIONS.PORTRAIT);

    useIonViewDidLeave(()=>{
        ScreenOrientation.unlock();
    })

    useIonViewWillEnter(() => {
        if (localStorage.getItem("jugadas")) {
            const jugadas: Jugada[] = JSON.parse(localStorage.getItem("jugadas") as string);
            setJugadas(jugadas.sort(function (a, b) { return a.intentos - b.intentos }));

        }
    })
    return (
        <IonPage>
            <IonHeader className="header">
                <IonToolbar className="header">
                
                <IonButtons slot="start">
          <IonBackButton defaultHref="home" />
        </IonButtons>
                    <IonTitle className="titleheader">Puntajes Altos</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    {
                        jugadas.slice(0, 3).map(jugada => {
                            if (jugada) {
                                return (
                                    <IonItem>
                                        <IonThumbnail slot="start">
                                            <img src="https://pngimg.com/uploads/star/star_PNG1597.png" />
                                        </IonThumbnail>
                                        <div className="iteminfo">
                                            <h4>{jugada.nickname}</h4>
                                            <IonLabel><IonBadge color="primary">Puntaje: {jugada.intentos}</IonBadge></IonLabel>
                                            <span className="puntaje">{jugada.nivel}</span>
                                        </div>
                                    </IonItem>
                                )
                            }

                        })
                    }
                </IonList>
            </IonContent>
        </IonPage>
    )
}

export default Puntaje;