import Kariny from '../../../assets/photos.us/Kariny.png';
import Laura from '../../../assets/photos.us/Laura.png';
import Ranny from '../../../assets/photos.us/Ranny.png';
import Yarlla from '../../../assets/photos.us/Yarlla.png';

export interface TeamMember {
    name: string;
    role: 'Front-End' | 'Back-End';
    photo: any;
}

export const team: TeamMember[] = [
    { name: 'Kariny Leandro da Silva', role: 'Back-End', photo: Kariny },
    { name: 'Laura de Matos Lima', role: 'Front-End', photo: Laura },
    { name: 'Maria Vitória Ferreira Soares', role: 'Front-End', photo: Ranny },
    { name: 'Yarlla Sales de Moura', role: 'Back-End', photo: Yarlla },
];
