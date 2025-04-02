'use client'

import { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const BasketContext = createContext();

export function BasketProvider({ children }) {
    const [basket, setBasket] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const basketData = Cookies.get('basket');
        if (basketData && basketData !== 'undefined') {
            setBasket(JSON.parse(basketData));
        }
        setLoading(false);
    }, []);

    const updateBasket = (newBasket) => {
        setBasket(newBasket);
        Cookies.set('basket', JSON.stringify(newBasket), { expires: 14 });
    };

    const addToBasket = async (basketIdent, package_id, quantity) => {
        try {
            const response = await fetch('/api/addToBasket', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    basketIdent,
                    package_id,
                    quantity
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to add to basket');
            }

            if (data.basket?.data?.ident) {
                updateBasket(data.basket);
            }

            return data;
        } catch (error) {
            throw error;
        }
    };

    const updateQuantity = async (basketIdent, package_id, quantity) => {
        try {
            const response = await fetch('/api/updateQuantity', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    basketIdent,
                    package_id,
                    quantity
                })
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to update quantity');
            }
            updateBasket(data.basket);
            return data;
        } catch (error) {
            throw error;
        }
    };
    const removeFromBasket = async (basketIdent, package_id) => {
        try {
            const response = await fetch('/api/removeFromBasket', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    basketIdent,
                    package_id
                })
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to remove from basket');
            }
            updateBasket(data.basket);
            return data;
        } catch (error) {
            throw error;
        }
    };

    return (
        <BasketContext.Provider value={{ basket, loading, updateBasket, addToBasket, updateQuantity, removeFromBasket }}>
            {children}
        </BasketContext.Provider>
    );
}

export function useBasket() {
    const context = useContext(BasketContext);
    if (context === undefined) {
        throw new Error('useBasket must be used within a BasketProvider');
    }
    return context;
} 