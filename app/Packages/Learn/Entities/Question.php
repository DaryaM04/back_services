<?php

namespace App\Packages\Learn\Entities;

//use App\Packages\Common\Domain\Interfaces\RepositoryInterface;

class Question
{
    public $id;

    public $name;

    public $hint;

    public $type;

    public $point;

    public $lesson_id;

    public $active;

    public $sort;

    public $answers;

    //    public function __construct(RepositoryInterface $rep, $prop)
    public function __construct($prop)
    {
        //        $this->rep = $rep;
        foreach ($prop as $key => $value) {
            $this->{$key} = $value;
        }
    }

    //     public function __get($key)
    //     {
    //         if ($key == 'answers') {
    //           if (!isset($this->_answers)) {
    //             $this->_answers = $this->rep->answers($this->id);
    //           }
    //           return $this->_answers;
    //         }
    //     }

    //     public function fetchAnswers() {
    //        $rep = $this->rep;
    //        $this->answers = $rep->answers($this->id);
    //     }

    public function checkQuestion(object $answer): bool
    {
        // if (empty($this->answers)) $this->fetchAnswers();

        return true;
    }

    /**
     * @param  int  $id
     * @return Question
//     */
    //    public static function getById(int $id): Question
    //    {
    //        $rep = new QuestionRepository();
    ////        $rep = $this->rep;
    //        $question = $rep->find($id);
    //        return $question;
    //    }
}
