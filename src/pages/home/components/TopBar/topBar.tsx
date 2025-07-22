import React from 'react';
import { View, TouchableOpacity, TextInput } from 'react-native';
import SearchIcon from '../../assets/TopBar/Icone pesquisa.svg';
import ProfileIcon from '../../assets/TopBar/Profile.svg';
import LumykWhiteIcon from '../../../../assets/logoWhite.svg'; 
import { themes } from '../../../../global/themes'; 
import { styles } from './styles'; 

interface TopBarProps {
    navigation?: any;
    title?: string;
    onSearchTextChange?: (text: string) => void;
};  

const TopBar: React.FC<TopBarProps> = ({ navigation, title, onSearchTextChange }) => {
    return (
        <View style={styles.topBar}>
            <View style={styles.topBarContent}>
                <View>
                    <LumykWhiteIcon style={{ marginLeft: -5 }} />
                </View>

                <View style={styles.searchContainer}>
                    <TouchableOpacity>
                        <SearchIcon width={20} height={20} />
                    </TouchableOpacity>
                    <TextInput
                        style={styles.searchInput}
                        placeholder={title}
                        placeholderTextColor={themes.colors.purpleDark}
                        onChangeText={onSearchTextChange}
                    />
                </View>

                { navigation && 
                    <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                        <ProfileIcon style={{ marginRight: 5 }} />
                    </TouchableOpacity>
                }
            </View>
        </View>
    );
};

export default TopBar;
