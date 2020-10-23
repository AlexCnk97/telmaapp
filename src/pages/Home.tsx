import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ScreenOrientation } from '@ionic-native/screen-orientation'
import './Home.css';

const Home: React.FC = () => {
  const [toast, setShowToast] = useState(false);
  const history = useHistory();

  ScreenOrientation.unlock();

  function ValidarAjustes() {
    if (localStorage.getItem("ajustes") != null) {
      history.push("/game")
    } else {
      setShowToast(true)
    }
  }
  return (
    <IonPage>
      {/* <IonHeader>
        <IonToolbar>
          <IonTitle>Adivina un numero</IonTitle>
        </IonToolbar>
      </IonHeader> */}
      <IonContent className="background" fullscreen>
        <div className="contenthome">
          <div className="box">
            <img className="imglogo" src="assets/img/logo.jpeg"></img>
          </div>
          <IonButton className="btncolor1" fill="outline" onClick={() => { ValidarAjustes() }} size="large" expand="block" >Iniciar Juego</IonButton>
          <Link to="/puntaje" style={{textDecoration:"none"}}>
            <IonButton className="btncolor2" fill="outline"  size="large" expand="block" >Puntajes Altos</IonButton>
          </Link>
          <Link to="/configuracion" style={{textDecoration:"none"}}>
            <IonButton className="btncolor3" fill="outline"  size="large" expand="block" >Configuracion</IonButton>
          </Link>
        </div>
        <IonToast
                    isOpen={toast}
                    onDidDismiss={() => setShowToast(false)}
                    message="Debes agregar tu nikcname y seleccionar el nivel del juego en la configuracion"
                    position="top"
                    duration={1000}
                />
      </IonContent>
    </IonPage>
  );
};

export default Home;
