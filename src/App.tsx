import React from 'react';
import useSwrFetch from './hooks/useGetBase.ts';

// Интерфейс для данных, которые мы ожидаем получить от API
interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

const SwrFetchComponent: React.FC = () => {
    // Используем хук для выполнения GET-запроса
    const { data, isLoading, isValidating, error } = useSwrFetch<Post>(
        'https://jsonplaceholder.typicode.com/posts/1'
    );

    return (
        <div>
            <h1>Пример использования хука useSwrFetch</h1>

            {isLoading && <p>Загрузка...</p>}

            {isValidating && <p>Обновление данных...</p>}

            {error && <p style={{ color: 'red' }}>Ошибка: {error.message}</p>}

            {data && (
                <div>
                    <h2>Данные:</h2>
                    <p>ID: {data.id}</p>
                    <p>Заголовок: {data.title}</p>
                    <p>Текст: {data.body}</p>
                </div>
            )}
        </div>
    );
};

export default SwrFetchComponent;