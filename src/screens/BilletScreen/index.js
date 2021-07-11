import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import C from './style';
import api from '../../services/api';
import { useStateValue } from '../../contexts/StateContext';
import DocItem from '../../components/DocItem';

export default () => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();
    const [loading, setLoading] = useState(true);
    const [docList, setDocList] = useState([]);

    useEffect(()=>{
        navigation.setOptions({
            headerTitle: 'Boletos'
        });
        getBillet();
    }, []);

    const getBillet = async () => {
        setDocList([]);
        setLoading(true);
        const result = await api.getBillet();
        setLoading(false);
        if(result.error === '') {
            setDocList(result.list);
        } else {
            alert(result.error);
        }
    }

    return (
        <C.Container>
            {!loading && docList.length === 0 &&
                <C.NoListArea>
                    <C.NoListText>Não há boletos desta unidade!</C.NoListText>
                </C.NoListArea>
            }
            <C.List
                data={docList}
                onRefresh={getBillet}
                refreshing={loading}
                renderItem={({item}) => <DocItem data={item} />}
                keyExtractor={(item) => item.id.toString()}
            />
        </C.Container>
    );
}