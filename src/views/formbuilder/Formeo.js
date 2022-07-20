import React, { createRef, useEffect } from 'react'
import { FormeoEditor, FormeoRenderer } from 'formeo'
import 'formeo/dist/formeo.min.css'
import "./formeo.css"

export const FormEditor = () => {

  const editorRef = createRef()

  useEffect(() => {
    new FormeoEditor({
      editorContainer: editorRef.current
    })
  }, [editorRef])

  return <div ref={editorRef} />
}

export const FormRenderer = () => {
  const rendererRef = createRef()

  useEffect(() => {
    const renderer = new FormeoRenderer({
      renderContainer: rendererRef.current
    })
    const handleUpdate = ({ detail: { formData } }) => renderer.render(formData)
    document.addEventListener('formeoSaved', handleUpdate, false)
  }, [rendererRef])

  return <div ref={rendererRef} />
}

// export default { FormEditor, FormRenderer }

export default function Formeo() {
  return (
    <div className="formeo">
      <FormEditor />
      <FormRenderer />
    </div>
  )
}
