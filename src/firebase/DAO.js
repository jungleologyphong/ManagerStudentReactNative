import {ToastAndroid} from 'react-native';
import firebaseConfig from '../firebase/firebaseConfig.js';
module.exports.delete = (key) =>{
    firebaseConfig.database().ref().child('Jounis').child(key).remove().then(() =>{
        console.log('Delete success !');
        ToastAndroid.show('Delete success!', ToastAndroid.SHORT);
    }).catch((error) =>{
        console.log('Delete failed !'+error);
        ToastAndroid.show('Delete fail !', ToastAndroid.SHORT);
    });
};
module.exports.insert = async(name,title,image) =>{
    const remoteUri = await _upLoadImages(name, image);
    firebaseConfig.database().ref().child('Jounis').push({
    name: name,
    title: title,
    image: remoteUri}).then(() =>{
        console.log('Insert success !');
        ToastAndroid.show('Insert success !', ToastAndroid.SHORT);
    }).catch((error) =>{
        console.log('Insert failed !'+error);
        ToastAndroid.show('Insert fail !', ToastAndroid.SHORT);
    });
};

module.exports.insert = async(fullname,email) =>{
    firebaseConfig.database().ref().child('Users').push({
    fullname: fullname,
    email: email,}).then(() =>{
        console.log('Insert success !');
        ToastAndroid.show('Register success !', ToastAndroid.SHORT);
    }).catch((error) =>{
        console.log('Insert failed !'+error);
        ToastAndroid.show('Register fail !', ToastAndroid.SHORT);
    });
};

module.exports.update = async (key,name,title,image) =>{
    const remoteUri = await _upLoadImages(name, image);
    firebaseConfig.database().ref().child('Jounis').child(key)
    .set({name:name, title:title, image:remoteUri}).then(() =>{
        console.log('Update success !');
        ToastAndroid.show('Update success !', ToastAndroid.SHORT);
    }).catch((error) =>{
        console.log('Update Failed : '+error);
        ToastAndroid.show('Update Failed', ToastAndroid.SHORT);
    });
};
const _upLoadImages = async (name,uri) =>{
    const path ='images/' +name+'.jpg';
    return new Promise(async(res,rej) =>{
        const response = await fetch(uri);
        const file = await response.blob();

        let upload = firebaseConfig.storage().ref(path).put(file);

        upload.on('state_changed',(snapshot)=>{},
        (err) =>{
            rej(err);
        },
        async () =>{
            const url = await upload.snapshot.ref.getDownloadURL();
            res(url);
            }
        );
    });
};
