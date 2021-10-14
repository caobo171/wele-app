export type UploadImage = {
    name: string,
    src: string,
    file: File
}

export type Param = {
    key: string,
    value: number | string
}


export type RawNotification = {
    id: number,
    user_id: number,
    user_name: string,
    metatype: string,
    object_id: number,
    object_type: string,
    since: number,
    image: string,
    content: string,
    from_avatar: RawImage,
    from_name: string,
    from_id: number,
    status: number,
    action: string,
    link: string
};

export type RawUser = {
    id: number,
    username: string,
    fullname: string,
    facebook: string,
    dayOfBirth: number,
    email: string,
    avatar: string,
    address: string,
    cover_avatar: string,
    sex: string,
    description: string,
    status: number,
    phone: string,
    since: number,
    last_update: number,
    role: number,
    user_type: number[]
};

export type RawImage = {
    id: number,
    link: string,
    name: string
};

export type RawComment = {
    user_id: number,
    id: number,
    user_name: string,
    user_avatar: string,
    last_update: number,
    metatype: string,
    object_id: string,
    object_export: string,
    object_type: string,
    content: string,
    since: number
}

export type RawLoginSession = {
    ip: string,
    id: number,
    start_time: number
}

export type RawBillboard = {
    id: number,
    metatype: string,
    user_id: number,
    score: number,
    since: number,
    last_update: number,
}

export type RawRecord = {
    score: number,
    podcast: number,
    time: number
}


export type RawDownloadLink = {
    name: string,
    link: string
}

export type RawPodcast = {
    id: number,
    name: string,
    sub_name: string,
    views: number,
    metatype: string,
    user_id: number,
    download_link: RawDownloadLink[],
    data: string,
    duration: number,
    image_url: string,
    hint: number[],
    narrator: string,
    source_key: number,
    description: string,
    since: number,
    last_update: number,
    file_size: number,
    file_path: string,
    result: string,
    collections: string[],
    member_count: number,
    status: number,
    members: {
        score: number,
        user_id: number
    }[]
}

export type RawPodcastSubmit = {
    id: number,
    metatype: string,
    user_id: number,
    content: string,
    data: string,
    status: number,
    draft: string,
    podcast_id: number,
    podcast_name: string,
    since: number,
    last_update: number,
    user_name: string,
    user_avatar: string,
    podcast_subname: string,
    current_time_listen: number,
    compare_result: {
        diffs: any[] ,
        unique_correct_words_num: number,
        miss_phrases: {
            [key: string]: number
        },
        residual_phrases: {
            [key: string]: number
        },
        wrong_phrases: {
            [keys: string]: string[]
        },
        percent: number
    }
}

export type RawPodcastCollection = {
    id: number,
    description: string,
    data: string,
    name: string,
    since: number,
    last_update: number,
    views: number,
}

export type RawUserActionLog = {
    id: number,
    user_id: number,
    podcast_id: string,
    status: number,
    data: string,
    content: string,
    podcast_image: string,
    podcast_name: string,
    podcast_sub_name: string,
    metatype: string,
    action: number,
    start_time: number,
    end_time: number,
    user_name: string,
    user_avatar: string,
    likes: number,
    like_logs: number[],
    is_public: number,
    allow_comment: boolean,
    comment_count: number,
    comments: RawComment[]
}

export type RawPersonalRecord = {
    id: string,
    user_id: number,
    username: string,
    following_users: string,
    metatype: string,
    submitted_podcasts: number,
    in_progress_podcasts: number,
    cache_vocabs: {
        [key:string]: number
    },
    cache_submits: {
        [key: number]: {
            value: number,
            listen_time: number,
            podcast_id: number,
            podcast_name: string,
            podcast_subname: string,
            record_time: number,
            compare_result: {
                unique_correct_words_num: number,
                miss_phrases: {
                    [key: string]: number
                },
                residual_phrases: {
                    [key: string]: number
                },
                wrong_phrases: {
                    [keys: string]: string[]
                },
                percent: number
            }

        }
    }
}

export type RawVocabItem = {
    correct_word: string,
    wrong_words: string[],
    freq: number,
    record_time: number
}

export type RawTimeListenItem = {
    record_time: number,
    listen_time: number,
    podcast_id: number,
    podcast_name: string,
    podcast_subname: string
}

export type RawPointsItem = {
    record_time: number,
    podcast_id: number,
    podcast_name: string,
    podcast_subname: string,
    value: number,
    accuracy: number
}

export type RawWordsItem = {
    record_time: number,
    podcast_id: number,
    podcast_name: string,
    podcast_subname: string,
    total_words: number,
    wrong_words: number,
    current_listened_words: number
}


export type ReportWordType = {
    label: string,
    freq: number,
    references: string[]
}


export type RawSystemNotification = {
    id: number,
    notification_ids: number[],
    metatype: string,
    is_private: boolean,
    since: number,
    receivers: number[],
    title: string,
    image: string,
    last_update: number,
    link: string,
    content: string,
    data: string,
    publish_time: number,
    user_id: number
}

export type RawCertification = {
    id: number,
    metatype: string,
    since: number,
    last_update: number,
    image: string,
    for_user_id: number,
    for_user_name: string,
    for_user_avatar: string,
    content: string,
    user_id: number,
    user_avatar: string,
    user_name: string,
    certification_type: number,
    user_action_log_id: number,
    data: string
}

export type RawBadge = {
    id: number,
    metatype: string,
    since: number,
    last_update: number,
    value: string, 
    data: string,
    badge_name: string
}
