const BASE_URL = process.env.REACT_APP_API_HOST || 'http://127.0.0.1:8000'

const ENDPOINTS = {
    BASE_URL,
    GH_LOGIN: BASE_URL + '/accounts/github/login/',
    GOOGLE_LOGIN: BASE_URL + '/accounts/google/login/',
    CHECK_HINT_AVAILABLE: BASE_URL + '/api/check-clue-available/',
    QUESTION: BASE_URL + '/api/question/',
    ANSWER: BASE_URL + '/api/answer/',
    CLUE: BASE_URL + '/api/clue/',
    SOCIAL_LOGIN_TOKEN: BASE_URL + '/api/accounts/get-social-token/',
    LEADERBOARD: BASE_URL + '/api/leaderboard/',
    CHECK_GAME_LIVE: BASE_URL + '/api/check-game-live/',
    LIST_GENRES: BASE_URL + '/api/list-genres/',
    SET_GENRES: BASE_URL + '/api/set-genre/'
}

export default ENDPOINTS;