import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import C from './style';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../../services/api';
import { useStateValue } from '../../contexts/StateContext';
import { launchCamera } from 'react-native-image-picker';

export default () => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();
    const [warnText, setWarnText] = useState('');
    const [photoList, setPhotoList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        navigation.setOptions({
            headerTitle: 'Adicionar OcorrĂȘncia',
        });
    }, []);

    const handleAddPhoto = async () => {
        launchCamera({
            mediaType: 'photo',
            maxWidth: 1280
        }, async (response) => {
            if(!response.didCancel) {
                setLoading(true);
                let result = await api.addWarningFile(response.assets[0]);
                setLoading(false);
                if(result.error === '') {
                    let list = [...photoList];
                    list.push(result.photo);
                    setPhotoList(list);
                } else {
                    alert(result.error);
                }
            }
        });
    }

    const handleDelPhoto = (url) => {
        let list = [...photoList];
        list = list.filter(value=>value!==url);
        setPhotoList(list);
    }

    const handleSaveWarn = async () => {
        if(warnText !== '') {
            const result = await api.addWarning(warnText, photoList);
            if(result.error === '') {
                navigation.navigate('WarningScreen');
            } else {
                alert(result.error);
            }
        } else {
            alert('Descreva a ocorrĂȘncia');
        }
    }

    return (
        <C.Container>
            <C.Scroller>
                <C.Title>Descreva a ocorrĂȘncia</C.Title>
                <C.Field
                    placeholder="Digite a ocorrĂȘncia"
                    value={warnText}
                    onChangeText={t=>setWarnText(t)}
                />
                <C.Title>Fotos Relacionadas</C.Title>
                <C.PhotoArea>
                    <C.PhotoScroll horizontal={true}>
                        <C.PhotoAddButton onPress={handleAddPhoto}>
                            <Icon name="camera" size={24} color="#000" />
                        </C.PhotoAddButton>
                        {photoList.map((item, index) => (
                            <C.PhotoItem key={index}>
                                <C.Photo source={{uri: item}} />
                                <C.PhotoRemoveButton onPress={()=>handleDelPhoto(item)}>
                                    <Icon name="remove" size={16} color="#FF0000" />
                                </C.PhotoRemoveButton>
                            </C.PhotoItem>
                        ))}
                    </C.PhotoScroll>
                </C.PhotoArea>

                {loading &&
                    <C.LoadingText>Enviando foto. Aguarde...</C.LoadingText>
                }

                <C.ButtonArea onPress={handleSaveWarn}>
                    <C.ButtonText>Salvar</C.ButtonText>
                </C.ButtonArea>
            </C.Scroller>
        </C.Container>
    );
}