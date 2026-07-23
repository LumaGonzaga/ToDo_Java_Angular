package Lista.ToDo.controller;

import Lista.ToDo.entity.ToDo;
import Lista.ToDo.service.ToDoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/todo")
@RequiredArgsConstructor
public class ToDoController {

    private final ToDoService toDoService;
    @GetMapping()
    public List<ToDo> getAllCategories() {
        return toDoService.findAll();
    }

    @GetMapping("/{id}")
    public ToDo findById(@PathVariable int id) {
        return toDoService.findById(id);
    }

    @PostMapping
    public ResponseEntity<String> create(@RequestBody ToDo toDo) {

        toDoService.create(toDo);

        return ResponseEntity.ok("ToDo criado com sucesso.");
    }

    @PutMapping("/{id}")
    public ToDo update(@PathVariable int id, @RequestBody ToDo toDo) {
        return toDoService.update(id, toDo);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable int id) {
        toDoService.delete(id);
        return ResponseEntity.ok("ToDo com ID " + id + " excluído com sucesso.");
    }
}
