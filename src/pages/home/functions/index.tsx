export function toggleGenreSelection(
    genre: string,
    selectedGenres: string[],
    setSelectedGenres: React.Dispatch<React.SetStateAction<string[]>>
) {
    if (selectedGenres.includes(genre)) {
        setSelectedGenres(selectedGenres.filter(item => item !== genre));
    } else {
        setSelectedGenres([...selectedGenres, genre]);
    }
}

export function toggleStateSelection(
    state: string,
    selectedStates: string[],
    setSelectedStates: React.Dispatch<React.SetStateAction<string[]>>
) {
    if (selectedStates.includes(state)) {
        setSelectedStates(selectedStates.filter(item => item !== state));
    } else {
        setSelectedStates([...selectedStates, state]);
    }
}

export function closeDropdowns(
    setGenreDropdownVisible: React.Dispatch<React.SetStateAction<boolean>>,
    setStateDropdownVisible: React.Dispatch<React.SetStateAction<boolean>>
) {
    setGenreDropdownVisible(false);
    setStateDropdownVisible(false);
}
