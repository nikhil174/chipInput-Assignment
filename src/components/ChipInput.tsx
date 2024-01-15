// ChipInput.tsx
import React, { useState, useRef, ChangeEvent, KeyboardEvent } from 'react';
import './chipInput.css';

interface Item {
    id: number;
    name: string;
    email: string;
}

interface ChipInputProps {
    items: Array<{ id: number, name: string, email: string }>;
}

const ChipInput: React.FC<ChipInputProps> = () => {
    const items : Item[] = [
        {
          id: 1,
          name : 'Nikhil Srivastava',
          email : 'nikhilsrivastavaone@gmail.com'
        },
        {
          id: 2,
          name : 'Ganesh Keshari',
          email: 'ganeshkeshari@gmail.com'
        },
        {
          id: 3,
          name : 'Harsh Jaiswal',
          email: 'harshjaiswal@gmail.com'
        },
        {
          id: 4,
          name: 'Shushant Dubey',
          email: 'shushantdubey@gmail.com'
        },
        {
          id: 5,
          name: 'Pankaj Kushwaha',
          email: 'pankajkushwaha@gmail.com'
        },
        {
          id: 6,
          name: 'Amitesh Gupta',
          email: 'amiteshgupta@gmail.com'
        },
        {
          id: 7,
          name: 'Nikhil Srivastava',
          email: 'nikhilsrivastava@gmail.com'
        }
    ];
    const [inputValue, setInputValue] = useState<string>('');
    const [inputFocus, setInputFocus] = useState<boolean>(false);
    const [selectedItems, setSelectedItems] = useState<Item[]>([]);
    const [selectedItemsId, setSelectedItemsId] = useState<number[]>([]);
    const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputValue(value);
        setHighlightedIndex(null);
    };

    const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Backspace' && inputValue === '') {
            if (highlightedIndex !== null) {
                // If there is a highlighted chip, remove it
                removeChip(selectedItems[highlightedIndex]);
                setHighlightedIndex(null);
            } else {
                // If no chip is highlighted, highlight the last chip
                setHighlightedIndex(selectedItems.length - 1);
            }
        }
    };

    const handleItemClick = (item: Item) => {
        // Add item to selected items and remove it from the list
        console.log(item);
        setSelectedItems([...selectedItems, item]);
        setSelectedItemsId([...selectedItemsId, item.id]);
        setInputValue('');
        setHighlightedIndex(null);
    };

    const handleInputFocus = (focused: boolean) => {
        setInputFocus(focused);
    };

    const removeChip = (item: Item) => {
        // Remove item from selected items and add it back to the list
        setSelectedItems(selectedItems.filter((selectedItem) => selectedItem.id !== item.id));
        setSelectedItemsId(selectedItemsId.filter((selectedItemId) => selectedItemId !== item.id));
        setHighlightedIndex(null);
    };


    return (
        <div className="chip-input-container">
            <div className="chips-container">
                {selectedItems.map((item, index) => (
                    <div
                        key={item.id}
                        className={`chip ${index === highlightedIndex ? 'highlighted' : ''}`}
                    >
                        <div className='item-image'>{item.name[0]}</div>
                        {item.name} <span className={`chip-remove ${index === highlightedIndex ? 'highlighted' : ''}`} onMouseDown={() => removeChip(item)}>X</span>
                    </div>
                ))}
                <div className="input-container">
                    <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleInputKeyDown}
                        onFocus={() => handleInputFocus(true)}
                        onBlur={() => handleInputFocus(false)}
                        placeholder="Type here..."
                    />
                    {inputFocus && <ul className="item-list">
                        {items
                            .filter((item) => !selectedItemsId.includes(item.id) && item['name'].toLowerCase().includes(inputValue.toLowerCase()))
                            .map((item) => (
                                <li key={item.id} onMouseDown={() => { handleItemClick(item) }}>
                                    <div className="item-detail">
                                        <div className='item-image'>{item.name[0]}</div>
                                        <span className='item-name'>{item.name}</span>
                                        <div>
                                            <span className='item-email'>{item.email}</span>
                                        </div>
                                    </div>
                                </li>
                            ))}
                    </ul>}
                </div>
            </div>

        </div>
    );
};

export default ChipInput;
