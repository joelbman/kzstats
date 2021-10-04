import Button from 'components/general/Button'
import { SearchIcon } from 'components/icons'
import React, { useState } from 'react'
import Modal from 'react-modal'

interface Props {
  stats?: string
  notes?: string
}

const BanInfo = ({ stats, notes }: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {isOpen && (
        // The modal really shouldn't be here. TODO: move it to banlist and toggle/edit content via context?
        <Modal isOpen shouldCloseOnOverlayClick={true} onRequestClose={() => setIsOpen(false)}>
          {stats && (
            <p>
              <h3>Stats:</h3> {stats}
            </p>
          )}
          {notes && (
            <p>
              <h3>Notes:</h3> {notes}
            </p>
          )}
        </Modal>
      )}
      <Button onClick={() => setIsOpen(true)}>
        <SearchIcon className="w-4 h-4 mr-0" />
      </Button>
    </>
  )
}

export default BanInfo
