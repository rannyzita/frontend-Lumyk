// components/TopBar.tsx
import React from 'react';
import { View, TouchableOpacity, TextInput, Text, StyleSheet } from 'react-native';
import SearchIcon from '../../assets/iconsNavigation/Icone pesquisa.svg'
import ProfileIcon from '../../assets/iconsNavigation/Profile.svg'
import LumykWhiteIcon from '../../assets/logoWhite.svg'; 
import { themes } from '../../global/themes'; 
import { styles } from './styles'; 

interface TopBarProps {
    navigation?: any; 
    title?: string;
}

const TopBar: React.FC<TopBarProps> = ({ navigation, title }) => {
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
                        placeholderTextColor={themes.colors.textInput}
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
