var adConfig = {
    "banner_width": "300",
    "banner_height": "250"
};

////////Funciones comunes, NO ELIMINAR!!!!!!!!////////////////////

function initEB() {
	if (!EB.isInitialized()) {
		EB.addEventListener(EBG.EventName.EB_INITIALIZED, startAd);
	} else {
		startAd();
	}
}


window.addEventListener("load", initEB);
///////////////////////////////////////////////////////////////////