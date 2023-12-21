import { useState, createContext } from 'react';
export const Context = createContext();
function Provider({ children }) {
    const [isRender, setIsRender] = useState(false);
    const [renderAvata, setRenderAvata] = useState(false);
    const [renderFavorite, setRenderFavorite] = useState(false);
    const [songId, setSongId] = useState(0);
    const [isPlay, setIsPlay] = useState(false);
    return (
        <Context.Provider
            value={[
                isRender,
                setIsRender,
                renderAvata,
                setRenderAvata,
                renderFavorite,
                setRenderFavorite,
                songId,
                setSongId,
                isPlay,
                setIsPlay,
            ]}
        >
            {children}
        </Context.Provider>
    );
}
export default Provider;
