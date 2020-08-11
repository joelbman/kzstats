import React from 'react'

const SteamButton = () => {
  return (
    <a href="api/auth/">
      <button className="bg-green-800 text-white rounded p-2 mt-4 block">
        <svg
          width="31"
          height="31"
          className="inline mr-4 fill-current"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M25.721 6.393a5.558 5.558 0 00-5.553 5.552c0 .512.092.999.223 1.47l-2.225 3.511a4.053 4.053 0 00-.913-.113c-.983 0-1.874.367-2.575.954l-6.634-2.911c.005-.079.023-.152.023-.231 0-2.224-1.811-4.033-4.034-4.033S0 12.4 0 14.625a4.038 4.038 0 004.033 4.034c.828 0 1.598-.25 2.238-.681l6.966 3.058c.102 2.135 1.855 3.846 4.016 3.846a4.038 4.038 0 004.033-4.034c0-.167-.028-.327-.05-.489l3.736-2.936c.246.035.492.076.748.076a5.56 5.56 0 005.553-5.553 5.558 5.558 0 00-5.552-5.553zM2.142 14.625c0-1.042.849-1.891 1.891-1.891 1.043 0 1.892.848 1.892 1.891a1.894 1.894 0 01-1.892 1.891 1.893 1.893 0 01-1.891-1.891zm15.111 8.178a1.959 1.959 0 010-3.916 1.959 1.959 0 010 3.916zm8.468-7.686c-1.75 0-3.172-1.423-3.172-3.172s1.422-3.172 3.172-3.172 3.172 1.423 3.172 3.172-1.422 3.172-3.172 3.172z" />
        </svg>
        Log in with Steam
      </button>
    </a>
  )
}

export default SteamButton
