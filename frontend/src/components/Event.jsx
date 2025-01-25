import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DatePicker from "react-date-picker";
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

export default function Record() {
  const [form, setForm] = useState({
    title: "",
    start: new Date(),
    end: new Date(),
  });
  const [title, setTitle] = useState("");
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [isNew, setIsNew] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id?.toString() || undefined;
      if(!id) return;
      setIsNew(false);
      const response = await fetch(
        `http://localhost:5000/api/${params.id.toString()}`
      );
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const record = await response.json();
      if (!record) {
        console.warn(`Record with id ${id} not found`);
        navigate("/");
        return;
      }
      setForm(record);
      setTitle(record.title);
      setStart(record.start);
      setEnd(record.end);
    }
    fetchData();
    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }
  function updateTitle(value) {
    setTitle(value);
  }
  function updateStart(value) {
    setStart(value);
  }
  function updateEnd(value) {
    setEnd(value);
  }
  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();
    const event = { 
        title: title, 
        start: start, 
        end: end,
        allDay: true
     };
    try {
      let response;
      if (isNew) {
        // if we are adding a new record we will POST to /record.
        response = await fetch("http://localhost:5000/api", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(event),
        });
      } else {
        // if we are updating a record we will PATCH to /record/:id.
        response = await fetch(`http://localhost:5000/api/${params.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(event),
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('A problem occurred adding or updating a record: ', error);
    } finally {
      setForm({ title: "", start: "", end: "" });
      setTitle("");
      setStart(new Date());
      setEnd(new Date());
      navigate("/");
    }
  }

  // This following section will display the form that takes the input from the user.
  return (
    <>
      <h3 className="text-lg font-semibold p-4">Create/Update Event Record</h3>
      <form
        onSubmit={onSubmit}
        className="border rounded-lg p-4"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-slate-900/10 pb-12 md:grid-cols-2">
          <div>
            <h2 className="text-base font-semibold leading-7 text-slate-900">
              Event Info
            </h2>
          </div>

          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 ">
            <div className="sm:col-span-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Title
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="First Last"
                    value={title}
                    onChange={(e) => updateTitle(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="flex">
            <div className="sm:col-span-4">
              <label
                htmlFor="start"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Start 
              </label>
              
              <div className="mt-2">
                  <DatePicker
                    hourAriaLabel="none"
                    name="start"
                    id="start"
                    initialValue={new Date()}
                    value={start}
                    onChange={setStart}
                  />
              </div>
            </div>
            <div className=" ml-4 sm:col-span-4">
              <label
                htmlFor="end"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                End
              </label>
              <div className="mt-2">
                  <DatePicker
                    name="end"
                    id="end"
                    initialValue={new Date()}
                    value={end}
                    onChange={setEnd}
                  />
              </div>
            </div>
            </div>
          </div>
        </div>
        <input
          type="submit"
          value="Save Event Record"
          className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3 cursor-pointer mt-4"
        />
      </form>
    </>
  );
}