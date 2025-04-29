export function closeDropdowns(
    setGenreDropdownVisible: React.Dispatch<React.SetStateAction<boolean>>,
    setStateDropdownVisible: React.Dispatch<React.SetStateAction<boolean>>
) {
    setGenreDropdownVisible(false);
    setStateDropdownVisible(false);
};
